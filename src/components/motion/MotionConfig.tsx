'use client';

import { MotionConfig as FramerMotionConfig, type MotionConfigProps } from 'framer-motion';

/**
 * Global MotionConfig wrapper for consistent animation behavior
 * 
 * Critical fix: Configures framer-motion to prevent flickering by:
 * - Using reduced motion when preferred
 * - Setting proper animation context
 */
export function MotionConfig({ children, ...props }: MotionConfigProps) {
  return (
    <FramerMotionConfig
      reducedMotion="user"
      {...props}
    >
      {children}
    </FramerMotionConfig>
  );
}
