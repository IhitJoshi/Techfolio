import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-sans font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-gray-800 shadow-sm',
        destructive:
          'bg-gray-100 text-black hover:bg-gray-200 focus-visible:ring-gray-300',
        outline:
          'border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-black',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ghost: 'hover:bg-gray-100 text-gray-600 hover:text-black',
        link: 'text-black underline-offset-4 hover:underline hover:text-gray-500',
      },
      size: {
        default: 'h-9 px-5 py-2 has-[>svg]:px-4',
        xs: "h-6 gap-1 rounded-full px-3 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-full gap-1.5 px-4 has-[>svg]:px-3',
        lg: 'h-10 rounded-full px-6 has-[>svg]:px-5',
        icon: 'size-9 rounded-full',
        'icon-xs': "size-6 rounded-full [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 rounded-full',
        'icon-lg': 'size-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };