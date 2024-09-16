import React from 'react';

import { ToggleGroupItem } from './toggle-group';
import { cn } from '../utils/utils';

const TipToggleItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupItem>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupItem>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupItem
      className={cn(
        'bg-cyan-verydark hover:bg-cyan-hover_strong hover:text-cyan-verydark text-white text-xl tracking-wider h-12 data-[state=on]:bg-cyan-strong data-[state=on]:text-cyan-verydark focus-visible:ring-cyan-verydark/50',
        'transition-colors duration-200 ease-in-out',
        className
      )}
      ref={ref}
      {...props}
    ></ToggleGroupItem>
  );
});

export { TipToggleItem };
