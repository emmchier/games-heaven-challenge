'use client';
import { useEffect } from 'react';

import { X } from 'lucide-react';
import { Button } from '@/app/components';
import { useUIStore } from '@/store/ui-store';

export const Toast: React.FC = () => {
  const {
    showSnackbar,
    description,
    action,
    showAction,
    onClickAction,
    closeButton,
    fullWidth,
    timer,
    closeSnackbar,
  } = useUIStore();

  useEffect(() => {
    if (showSnackbar && timer > 0) {
      const timerId = setTimeout(() => {
        closeSnackbar();
      }, timer * 1000);
      return () => clearTimeout(timerId);
    }
  }, [showSnackbar, timer, closeSnackbar]);

  const positionClasses = {
    'bottom-left': 'bottom-10 left-10',
  };

  const modeStyles = 'bg-[#22223C] text-[#FFFFFF]';

  return (
    <div
      className={`fixed z-50 flex items-center justify-between p-4 shadow-xl transition-all duration-300 ease-in-out transform ${
        showSnackbar
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
      } ${positionClasses['bottom-left']} ${modeStyles} min-h-[48px] ${
        fullWidth ? 'w-full' : 'min-w-[460px]'
      }`}
    >
      <div className="ml-4 flex-grow">
        <p className="text-base line-clamp-3 break-words">{description}</p>
      </div>
      {showAction && (
        <div
          className="ml-4 cursor-pointer font-regular text-[20px] leading-[24px]"
          onClick={onClickAction || (() => {})}
        >
          {action}
        </div>
      )}
      {closeButton && (
        <Button
          ariaLabel="cerrar snackbar"
          onClick={closeSnackbar}
          variant="ghosted"
          isRounded
          className="ml-4"
          iconButton={<X size={24} color="#FFF" />}
          size="sm"
        />
      )}
    </div>
  );
};
