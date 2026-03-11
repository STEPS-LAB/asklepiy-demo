'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to prevent animation flickering after completion
 * 
 * This hook manages the will-change CSS property to:
 * 1. Enable GPU acceleration during animation
 * 2. Disable it after completion to free up memory
 * 
 * @param isAnimating - Whether the element is currently animating
 * @returns CSS properties to apply to the element
 */
export function useAntiFlicker(isAnimating: boolean = true) {
  const [willChange, setWillChange] = useState<string>('auto');

  useEffect(() => {
    if (isAnimating) {
      // Enable GPU acceleration during animation
      setWillChange('transform, opacity');
      
      // Disable after animation completes to free memory
      const timer = setTimeout(() => {
        setWillChange('auto');
      }, 1000); // Wait for typical animation duration

      return () => clearTimeout(timer);
    } else {
      setWillChange('auto');
    }
  }, [isAnimating]);

  return {
    willChange,
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  };
}

/**
 * HOC wrapper for adding anti-flicker styles to motion components
 * 
 * Usage:
 * ```tsx
 * const MotionCard = withAntiFlicker(motion.div);
 * 
 * <MotionCard
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 * />
 * ```
 */
export function withAntiFlicker<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AntiFlickerComponent(props: P) {
    const style = useAntiFlicker(true);
    
    return (
      <Component
        {...props}
        style={{
          ...(props as any).style,
          ...style,
        }}
      />
    );
  };
}
