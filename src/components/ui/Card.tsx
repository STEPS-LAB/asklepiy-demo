'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHoverVariants, fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/motion';
import type { CardProps } from '@/types';

/**
 * Premium Card Component with enhanced animations
 * 
 * Critical fix: Removed conflicting CSS transitions that caused flickering.
 * GPU acceleration is now handled by framer-motion and CSS.
 */
export function Card({ children, className, interactive = false, onClick }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-sm shadow-medical-md',
        interactive && 'cursor-pointer hover:shadow-medical-xl',
        'transform-gpu',
        className
      )}
      onClick={onClick}
      variants={interactive ? cardHoverVariants : fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px', amount: 0.3 }}
      whileHover={interactive ? 'hover' : undefined}
      whileTap={interactive ? 'tap' : undefined}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card with stagger animation for lists
 * 
 * Critical fix: Removed conflicting CSS transitions, added transform-gpu
 */
export function CardStagger({ children, className, index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-sm shadow-medical-md',
        'transform-gpu',
        className
      )}
      variants={staggerItemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Premium Card Header with subtle border
 */
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn(
        'px-6 py-5 border-b border-medical-surface-200',
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card Header with badge
 */
export function CardHeaderWithBadge({
  children,
  badge,
  badgeColor = 'bg-medical-accent-600',
  className,
}: {
  children: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  className?: string;
}) {
  return (
    <CardHeader className={className}>
      <div className="flex items-center justify-between">
        {children}
        {badge && (
          <motion.span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium text-white',
              badgeColor
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.3 }}
          >
            {badge}
          </motion.span>
        )}
      </div>
    </CardHeader>
  );
}

/**
 * Premium Card Content with smooth entry
 */
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn('px-6 py-5', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card Content with fade in animation
 */
export function CardContentFade({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn('px-6 py-5', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Premium Card Footer with accent background
 */
export function CardFooter({ children, className, accent = false }: { children: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <motion.div
      className={cn(
        'px-6 py-5 border-t border-medical-surface-200',
        accent && 'bg-medical-surface-50',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card Grid for responsive layouts
 */
export function CardGrid({
  children,
  className,
  columns = 3,
}: {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <motion.div
      className={cn('gap-6', columnClasses[columns], className)}
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

/**
 * Feature Card with icon and enhanced hover effects
 * 
 * Critical fix: Removed conflicting CSS transitions, added transform-gpu for GPU acceleration
 */
export function FeatureCard({
  icon,
  title,
  description,
  className,
  index = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-sm shadow-medical-md p-6 lg:p-8',
        'transform-gpu',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="w-14 h-14 bg-gradient-to-br from-medical-primary-900 to-medical-accent-600 rounded-sm flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <div className="text-white">{icon}</div>
      </motion.div>
      <h3 className="text-lg font-medium text-medical-primary-900 mb-3 font-secondary">
        {title}
      </h3>
      <p className="text-medical-text-secondary font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/**
 * Stats Card with animated numbers placeholder
 * 
 * Critical fix: Removed conflicting CSS transitions, added transform-gpu for GPU acceleration
 */
export function StatsCard({
  value,
  label,
  icon,
  trend,
  className,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-sm shadow-medical-md p-6',
        'transform-gpu',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="w-12 h-12 bg-medical-accent-50 rounded-sm flex items-center justify-center text-medical-accent-600">
            {icon}
          </div>
        )}
        {trend && (
          <motion.span
            className={cn(
              'text-sm font-medium px-2 py-1 rounded-full',
              trend.positive ? 'bg-medical-status-success/10 text-medical-status-success' : 'bg-medical-status-error/10 text-medical-status-error'
            )}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {trend.positive ? '+' : '-'}{trend.value}
          </motion.span>
        )}
      </div>
      <motion.div
        className="text-3xl font-medium text-medical-primary-900 mb-1 font-secondary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {value}
      </motion.div>
      <p className="text-medical-text-tertiary text-sm">{label}</p>
    </motion.div>
  );
}
