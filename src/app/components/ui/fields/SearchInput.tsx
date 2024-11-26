'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Info, X, XCircle } from 'lucide-react';

interface SearchInputProps {
  name?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  hideLabel?: boolean;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  options: string[];
  helperText?: string;
  state?: 'enabled' | 'error' | 'disabled';
  className?: string;
  prefix?: React.ReactNode;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  name,
  placeholder = 'Buscar...',
  value: controlledValue,
  label = 'Label',
  hideLabel = false,
  isRequired = false,
  options,
  helperText,
  state = 'enabled',
  className = '',
  prefix,
  onChange,
  onFocus,
  onBlur,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Nuevo: Índice de la opción activa
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false); // Para mostrar el menú

  useEffect(() => {
    if (controlledValue) {
      setSearchTerm(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredOptions(filtered);
      setIsOptionsVisible(true); // Mostrar el menú cuando hay resultados
    } else {
      setFilteredOptions([]);
      setIsOptionsVisible(false); // Ocultar el menú si no hay términos
    }
  }, [searchTerm, options]);

  const handleReset = () => {
    setSearchTerm('');
    setFilteredOptions([]);
    setIsOptionsVisible(false);
    if (onChange) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleOptionClick = (option: string) => {
    setSearchTerm(option);
    setFilteredOptions([]);
    setActiveIndex(null);
    setTimeout(() => {
      setIsOptionsVisible(false);
    }, 100);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    if (onChange) {
      onChange(event);
    }

    // Si no hay valor de búsqueda, forzamos el cierre del menú
    if (!newValue) {
      setIsOptionsVisible(false);
      setFilteredOptions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && filteredOptions.length > 0) {
      setActiveIndex((prevIndex) =>
        prevIndex === null ? 0 : (prevIndex + 1) % filteredOptions.length,
      );
      event.preventDefault();
    } else if (event.key === 'ArrowUp' && filteredOptions.length > 0) {
      setActiveIndex((prevIndex) =>
        prevIndex === null
          ? filteredOptions.length - 1
          : (prevIndex - 1 + filteredOptions.length) % filteredOptions.length,
      );
      event.preventDefault();
    } else if (event.key === 'Enter' && activeIndex !== null) {
      // Seleccionar la opción activa con Enter
      handleOptionClick(filteredOptions[activeIndex]);
      setIsOptionsVisible(false); // Cerrar el menú después de seleccionar
      event.preventDefault();
    } else if (event.key === 'Escape') {
      setIsOptionsVisible(false); // Cerrar el menú con Escape
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setIsOptionsVisible(false);
    }
  }, [searchTerm]);

  const handleOptionMouseEnter = (index: number) => {
    setActiveIndex(index); // Activar la opción cuando el mouse pasa sobre ella
  };

  const isDisabled = state === 'disabled';

  // Estilos base
  const baseStyles =
    'block w-full text-lg h-16 border-[2px] transition-colors duration-300';

  // Alineación del padding dependiendo de si hay prefijo o no
  const paddingLeft = prefix ? 'pl-[48px]' : 'pl-4'; // Cambia aquí el valor a 'pl-16'
  const paddingRight = `pr-[48px]`;

  // Estilos de focus
  const focusStyles = !isDisabled
    ? 'focus:outline-none focus:ring-[1px] focus:ring-offset-2 focus:ring-[#7171FF] focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-[#7171FF]'
    : ''; // Si está deshabilitado, no se aplican los estilos de focus

  // Estilos de hover
  const hoverStyles =
    state !== 'disabled' && state !== 'error'
      ? 'hover:border-[#22223C] hover:text-[#22223C]'
      : '';

  // Estilos según el estado
  const stateStyles = clsx({
    'border-[#8383A1] text-[#22223C]': state === 'enabled',
    'border-[#FF6D6D]': state === 'error',
    'border-[#CECEE5] cursor-not-allowed text-[#CECEE5]': state === 'disabled',
  });

  // Estilos del label según el estado
  const labelStyles = clsx({
    'mb-1 font-medium transition-colors duration-300': !hideLabel,
    'text-[#8383A1]': state === 'enabled',
    'text-[#FF6D6D]': state === 'error',
    'text-[#CECEE5]': state === 'disabled',
    'group-hover:text-[#22223C]': state === 'enabled',
  });

  // Estilos del texto de ayuda
  const helperTextStyles = clsx({
    'mt-2 text-sm flex items-center font-medium': true,
    'text-[#8383A1]': state === 'enabled',
    'text-[#FF6D6D]': state === 'error',
    'text-[#CECEE5]': state === 'disabled',
  });

  return (
    <div className={`relative w-full group ${className}`} aria-live="polite">
      {!hideLabel && (
        <label
          htmlFor={name}
          className={clsx('block text-[20px]', labelStyles)}
        >
          {label}
          {isRequired && (
            <span
              className={clsx('ml-2 text-sm', {
                'text-[#8383A1]': state === 'enabled',
                'text-[#CECEE5]': state === 'disabled',
              })}
            >
              (Opcional)
            </span>
          )}
        </label>
      )}
      <div className={clsx('relative flex items-center justify-center')}>
        {prefix && (
          <span
            className={clsx(
              'absolute left-[2px] pr-[12px] pl-[16px] transform',
              {
                'text-[#8383A1]': state === 'enabled',
                'text-[#CECEE5]': state === 'disabled',
              },
            )}
          >
            {prefix}
          </span>
        )}
        <input
          id={name}
          name={name}
          tabIndex={isDisabled ? -1 : 0}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={isDisabled ? (e) => e.preventDefault() : onFocus}
          onBlur={isDisabled ? (e) => e.preventDefault() : onBlur}
          onKeyUp={isDisabled ? (e) => e.preventDefault() : onKeyUp}
          onKeyDown={handleKeyDown} // Manejar eventos de teclado
          onMouseEnter={isDisabled ? (e) => e.preventDefault() : onMouseEnter}
          onMouseLeave={isDisabled ? (e) => e.preventDefault() : onMouseLeave}
          placeholder={placeholder}
          aria-invalid={state === 'error'}
          aria-describedby={`${name}-focus`}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          className={clsx(
            baseStyles,
            paddingLeft,
            paddingRight,
            hoverStyles,
            stateStyles,
            focusStyles,
          )}
        />
        {searchTerm && !isDisabled && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-[2px] pl-[12px] pr-[16px] h-[70%] transform text-[#8383A1]"
            aria-label="Clear input"
          >
            <X size={24} />
          </button>
        )}
      </div>
      {isOptionsVisible && filteredOptions.length > 0 && (
        <div className="absolute top-full mt-1 w-full border rounded-lg bg-white shadow-lg z-10">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleOptionMouseEnter(index)}
              className={clsx(
                'px-4 py-4 cursor-pointer flex items-center',
                index === activeIndex ? 'bg-gray-200' : 'hover:bg-gray-100',
              )}
              role="option"
              aria-selected={index === activeIndex}
              tabIndex={-1} // Hacer que las opciones sean seleccionables con teclado
              style={{ height: '64px' }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {helperText && (
        <p id={`${name}-helper`} className={helperTextStyles}>
          <span className="mr-1">
            {state === 'error' ? <XCircle size={16} /> : <Info size={16} />}
          </span>
          {helperText}
        </p>
      )}
    </div>
  );
};
