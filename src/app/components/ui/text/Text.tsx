import { FCC } from '@/types';
import clsx from 'clsx';

interface TextProps {
  type?: 'title' | 'body';
  size?: 'sm' | 'md' | 'lg';
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: string;
  className?: string;
}

export const Text: FCC<TextProps> = ({
  type = 'body',
  heading = 'h2',
  size = 'md',
  color = 'text-light-neutral-900',
  weight = 'light',
  className,
  children,
}) => {
  const weightClasses = clsx({
    'font-light': type === 'title' && weight === 'light',
    'font-normal':
      (type === 'title' && weight === 'regular') ||
      (type === 'body' && weight === 'regular'),
    'font-medium': weight === 'medium',
    'font-semibold': weight === 'semiBold',
    'font-bold': weight === 'bold',
  });

  const baseClasses = clsx({
    [`text-${color}`]: color,
    'tracking-custom': true,
  });

  const typeClasses = clsx(
    {
      title: {
        lg: 'text-title-lg-mobile lg:text-title-lg-desktop',
        md: 'text-title-md-mobile lg:text-title-md-desktop',
        sm: 'text-title-sm-mobile lg:text-title-sm-desktop',
      },
      body: {
        lg: 'text-body-lg-mobile lg:text-body-lg-desktop',
        md: 'text-body-md-mobile lg:text-body-md-desktop',
        sm: 'text-body-sm-mobile lg:text-body-sm-desktop',
      },
    }[type][size],
  );

  const Component = type === 'title' ? heading : 'p';

  return (
    <Component
      className={clsx(baseClasses, weightClasses, typeClasses, className)}
    >
      {children}
    </Component>
  );
};
