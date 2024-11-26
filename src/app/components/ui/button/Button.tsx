import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  ariaLabel: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'text' | 'ghosted' | 'softed';
  hasIconLeft?: ReactNode;
  hasIconRight?: ReactNode;
  iconButton?: ReactNode;
  fullWidth?: boolean;
  mode?: 'light' | 'dark';
  className?: string;
  isRounded?: boolean;
  children?: ReactNode;
  tabIndex?: number;
  state?: 'enabled' | 'disabled';
}

export const Button = ({
  ariaLabel = '',
  type = 'button',
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = 'md',
  variant = 'filled',
  hasIconLeft = null,
  hasIconRight = null,
  iconButton = null,
  fullWidth = false,
  mode = 'light',
  className = '',
  isRounded = false,
  children,
  tabIndex,
  state = 'enabled',
}: ButtonProps): JSX.Element => {
  const isDisabled = state === 'disabled';

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-300';
  const focusStyles = !isDisabled
    ? 'focus:outline-none focus:ring-[3px] focus:ring-offset-2 focus:ring-[#7171FF] focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-[#7171FF]'
    : '';

  const sizeStyles = clsx({
    'h-10 px-6 text-[16px]': size === 'sm' && !iconButton,
    'h-16 px-8 text-[20px]': size === 'md' && !iconButton,
    'h-24 px-12 text-[24px]': size === 'lg' && !iconButton,
    'h-auto px-0': variant === 'text',
    'w-10 h-10': size === 'sm' && iconButton,
    'w-16 h-16': size === 'md' && iconButton,
    'w-24 h-24': size === 'lg' && iconButton,
  });

  const widthStyles = fullWidth && !iconButton ? 'w-full' : '';

  const modeStyles = clsx({
    'bg-[#22223C] text-[#FFFFFF]':
      mode === 'light' && variant === 'filled' && !isDisabled,
    'bg-[#FFFFFF] text-[#22223C]':
      mode === 'dark' && variant === 'filled' && !isDisabled,
    'border-[#22223C] text-[#22223C]':
      mode === 'light' && variant === 'outlined' && !isDisabled,
    'border-[#FFFFFF] text-[#FFFFFF]':
      mode === 'dark' && variant === 'outlined' && !isDisabled,
    'text-[#22223C]':
      mode === 'light' &&
      (variant === 'text' || variant === 'ghosted' || variant === 'softed') &&
      !isDisabled,
    'text-[#FFFFFF]':
      mode === 'dark' &&
      (variant === 'text' || variant === 'ghosted' || variant === 'softed') &&
      !isDisabled,
    'bg-[#ECECF4] text-[#22223C]': mode === 'light' && variant === 'softed',

    // Estilos cuando el botón está deshabilitado (isDisabled === true)
    'bg-[#ECECF4] text-[#CECEE5] border-[#CECEE5]':
      isDisabled && variant === 'filled',
    'border-[#CECEE5] text-[#CECEE5]': isDisabled && variant === 'outlined',
    'bg-[#ECECF4] text-[#CECEE5]':
      (isDisabled && variant === 'ghosted') ||
      (isDisabled && variant === 'softed'),
    'text-[#CECEE5]': isDisabled && variant === 'text',
  });

  const hoverStyles = clsx({
    'hover:bg-[#626272]': variant === 'filled' && state === 'enabled',
    'hover:bg-[#22223C]':
      mode === 'dark' && variant === 'outlined' && state === 'enabled',
    'hover:bg-[#ECECF4]':
      (variant === 'outlined' && state === 'enabled') ||
      (variant === 'ghosted' && state === 'enabled'),
    'hover:text-[#56567F]': variant === 'text' && state === 'enabled',

    // Hover state for the new 'softed' variant
    'hover:bg-[#CECEE5]': variant === 'softed' && state === 'enabled', // Updated for softed
  });

  const pressedStyles = clsx({
    // Pressed state for 'softed'
    'active:bg-[#BEBED4]': variant === 'softed' && state === 'enabled', // Updated for softed
    'active:bg-[#CECEE5]': variant === 'ghosted' && state === 'enabled', // Updated for ghosted
  });

  const borderStyles = clsx({
    'border-2 border-transparent': variant !== 'outlined',
    'border-2': variant === 'outlined',
  });

  const iconButtonStyles = iconButton ? 'p-0' : '';

  const roundedStyles = isRounded ? 'rounded-full' : 'rounded-none';

  const stateStyles = clsx({
    'border-[#CECEE5] cursor-not-allowed text-[#CECEE5]': state === 'disabled',
  });

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={isDisabled ? undefined : onMouseEnter}
      onMouseLeave={isDisabled ? undefined : onMouseLeave}
      tabIndex={isDisabled ? -1 : tabIndex}
      aria-disabled={isDisabled}
      className={clsx(
        baseStyles,
        focusStyles,
        sizeStyles,
        widthStyles,
        modeStyles,
        hoverStyles,
        pressedStyles,
        borderStyles,
        iconButtonStyles,
        roundedStyles,
        stateStyles,
        className,
        'whitespace-nowrap',
      )}
    >
      {iconButton ? (
        <span className="flex items-center justify-center">{iconButton}</span>
      ) : (
        <>
          {hasIconLeft && <span className="w-6 h-6 mr-2">{hasIconLeft}</span>}
          {children && <span>{children}</span>}
          {hasIconRight && <span className="w-6 h-6 ml-2">{hasIconRight}</span>}
        </>
      )}
    </button>
  );
};
