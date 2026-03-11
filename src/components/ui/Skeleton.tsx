'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-medical-surface-200',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-sm',
        variant === 'text' && 'h-4 rounded',
        animation === 'pulse' && 'animate-pulse',
        className
      )}
      style={{
        width,
        height,
      }}
      aria-hidden="true"
    />
  );
}

export function SkeletonAvatar({ className }: { className?: string }) {
  return <Skeleton variant="circular" className={cn('w-12 h-12', className)} />;
}

export function SkeletonImage({
  className,
  aspect = 'square',
}: {
  className?: string;
  aspect?: 'square' | 'video' | 'portrait';
}) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[aspect];

  return <Skeleton className={cn(aspectClass, className)} variant="rectangular" />;
}
