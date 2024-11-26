'use client';

import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface TooltipProps {
  direction?: 'top' | 'right' | 'bottom' | 'left';
  bg?: string;
  textColor?: string;
  content: string;
  timer?: number;
  size?: 'md' | 'sm';
  openBy?: 'click' | 'hover';
  lapse?: number;
  children: ReactNode;
  className?: ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({
  direction = 'right',
  bg = '#000000',
  textColor = '#FFFFFF',
  content,
  timer = 5,
  size = 'md',
  openBy = 'hover',
  lapse = 0,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const showTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (showTimeout.current) clearTimeout(showTimeout.current);
  };

  const handleShowTooltip = () => {
    clearTimers();
    showTimeout.current = setTimeout(() => {
      setIsVisible(true);
    }, lapse * 1000);
  };

  const handleHideTooltip = () => {
    clearTimers();
    setIsVisible(false);
  };

  const handleClick = () => {
    if (isVisible) {
      handleHideTooltip();
    } else {
      handleShowTooltip();
      hideTimeout.current = setTimeout(() => {
        setIsVisible(false);
      }, timer * 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const tooltipPosition = clsx({
    'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 -ml-[4px]':
      direction === 'left',
    'right-0 top-1/2 transform translate-x-full -translate-y-1/2 -mr-[4px]':
      direction === 'right',
    '-top-1 left-1/2 transform -translate-x-1/2 -translate-y-full -mb-2':
      direction === 'top',
    '-bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full -mt-2':
      direction === 'bottom',
  });

  const sizeClasses = clsx({
    'p-[12px] text-base': size === 'md',
    'p-[8px] text-sm': size === 'sm',
  });

  const triggerEvents =
    openBy === 'hover'
      ? {
          onMouseEnter: handleShowTooltip,
          onMouseLeave: handleHideTooltip,
        }
      : {
          onClick: handleClick,
        };

  return (
    <div className="relative inline-block" {...triggerEvents}>
      <div
        className={clsx(
          'absolute rounded-[4px] font-medium transition-opacity duration-300',
          tooltipPosition,
          sizeClasses,
          {
            'opacity-0 pointer-events-none': !isVisible,
            'opacity-100 pointer-events-auto': isVisible,
          },
          className,
        )}
        style={{
          backgroundColor: bg,
          color: textColor,
          maxWidth: '300px',
          width: 'auto',
          whiteSpace: size === 'sm' ? 'nowrap' : 'normal',
          overflowWrap: 'break-word',
        }}
      >
        {content}
      </div>
      {children}
    </div>
  );
};
