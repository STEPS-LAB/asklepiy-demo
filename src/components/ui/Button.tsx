'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonHoverVariants, rotateVariants } from '@/lib/motion';
import type { ButtonProps } from '@/types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium rounded-sm relative overflow-hidden',
      !disabled && !isLoading && 'cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-accent-600 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'transition-all duration-500 ease-out',
      !isLoading && !disabled && 'hover:shadow-medical-lg active:shadow-medical-md'
    );

    const variantStyles = {
      primary: cn(
        'bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white',
        'shadow-medical-md',
        'hover:from-medical-primary-800 hover:to-medical-primary-700',
        'active:from-medical-primary-900 active:to-medical-primary-800'
      ),
      secondary: cn(
        'bg-gradient-to-br from-medical-accent-600 to-medical-accent-500 text-white',
        'shadow-medical-md',
        'hover:from-medical-accent-500 hover:to-medical-accent-400',
        'active:from-medical-accent-600 active:to-medical-accent-500'
      ),
      outline: cn(
        'bg-transparent text-medical-primary-900',
        'border-2 border-medical-primary-900',
        'hover:bg-medical-primary-900 hover:text-white',
        'active:bg-medical-primary-800'
      ),
      ghost: cn(
        'bg-transparent text-medical-text-secondary',
        'hover:bg-medical-surface-100 hover:text-medical-primary-900',
        'active:bg-medical-surface-200'
      ),
      danger: cn(
        'bg-gradient-to-br from-medical-status-error to-red-600 text-white',
        'shadow-medical-md',
        'hover:from-red-600 hover:to-red-500',
        'active:from-medical-status-error active:to-red-600'
      ),
      success: cn(
        'bg-gradient-to-br from-medical-status-success to-green-600 text-white',
        'shadow-medical-md',
        'hover:from-green-600 hover:to-green-500',
        'active:from-medical-status-success active:to-green-600'
      ),
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm h-10',
      md: 'px-6 py-3 text-sm h-11',
      lg: 'px-8 py-4 text-base h-14',
    };

    const isFullWidth = className?.includes('w-full');

    return (
      <motion.div
        className={cn(isFullWidth ? 'w-full' : 'inline-block')}
        variants={buttonHoverVariants}
        initial="rest"
        whileHover={!isLoading && !disabled ? 'hover' : undefined}
        whileTap={!isLoading && !disabled ? 'tap' : undefined}
      >
        <button
          ref={ref}
          type={type}
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
          disabled={disabled || isLoading}
          onClick={onClick}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {/* Shine effect on hover */}
          {!isLoading && !disabled && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              style={{ transform: 'translateX(-100%)' }}
            />
          )}

          {isLoading ? (
            <div className="flex items-center gap-2">
              <motion.svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                variants={rotateVariants}
                animate="rotate"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </motion.svg>
              <span>{children}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {leftIcon && (
                <span className="inline-flex">
                  {leftIcon}
                </span>
              )}
              <span>{children}</span>
              {rightIcon && (
                <span className="inline-flex">
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';

export { Button };

/**
 * Icon Button Component
 */
export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}>(({ className, icon, variant = 'ghost', size = 'md', isLoading, onClick, type = 'button', ...props }, ref) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  const variantClasses = {
    primary: 'bg-medical-primary-900 text-white hover:bg-medical-primary-800',
    secondary: 'bg-medical-accent-600 text-white hover:bg-medical-accent-700',
    ghost: 'bg-transparent text-medical-text-secondary hover:bg-medical-surface-100 hover:text-medical-primary-900',
    danger: 'bg-medical-status-error/10 text-medical-status-error hover:bg-medical-status-error/20',
  };

  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center rounded-sm transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-accent-600 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        onClick={onClick}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading ? (
          <motion.svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            variants={rotateVariants}
            animate="rotate"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        ) : (
          icon
        )}
      </button>
    </motion.div>
  );
});

IconButton.displayName = 'IconButton';

/**
 * Text Button Component (minimal styling)
 */
export const TextButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
}>(({ className, children, isLoading, onClick, type = 'button', ...props }, ref) => {
  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 text-medical-accent-600 font-medium',
          'hover:text-medical-accent-700 hover:underline hover:underline-offset-4',
          'transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        onClick={onClick}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading ? (
          <motion.svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            variants={rotateVariants}
            animate="rotate"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </motion.svg>
        ) : null}
        {children}
      </button>
    </motion.div>
  );
});

TextButton.displayName = 'TextButton';
