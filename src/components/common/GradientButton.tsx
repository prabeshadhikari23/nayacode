import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends ButtonProps {
  gradient?: 'primary' | 'secondary' | 'accent' | 'success';
  children: React.ReactNode;
}

const gradientClasses = {
  primary: 'bg-gradient-to-r from-vibrant-purple to-vibrant-pink hover:from-vibrant-pink hover:to-vibrant-purple',
  secondary: 'bg-gradient-to-r from-vibrant-cyan to-vibrant-blue hover:from-vibrant-blue hover:to-vibrant-cyan',
  accent: 'bg-gradient-to-r from-vibrant-orange to-vibrant-red hover:from-vibrant-red hover:to-vibrant-orange',
  success: 'bg-gradient-to-r from-vibrant-emerald to-vibrant-cyan hover:from-vibrant-cyan hover:to-vibrant-emerald',
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  gradient = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <Button
      className={cn(
        gradientClasses[gradient],
        'text-white shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};