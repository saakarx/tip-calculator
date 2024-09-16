import React from 'react';

import { cn } from '../utils/utils';

type ButtonProps = React.PropsWithChildren & {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  className,
  type = 'button',
  children,
}) => {
  return (
    <button
      type={type}
      className={cn(
        'min-h-12 rounded-md bg-cyan-strong text-base text-cyan-verydark focus:outline-none focus:ring-2 focus:ring-cyan-strong/50 focus:ring-offset-2 focus:ring-offset-cyan-verydark hover:bg-cyan-hover_strong',
        'transition-colors duration-200 ease-in-out',
        className
      )}
    >
      {children}
    </button>
  );
};
Button.displayName = 'Button';

export default Button;
