'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

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

export function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-sm shadow-medical-md">
      <Skeleton variant="rectangular" className="w-full aspect-square mb-4" />
      <Skeleton className="w-3/4 mb-2" />
      <Skeleton className="w-full mb-2" />
      <Skeleton className="w-1/2" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={i === lines - 1 ? 'w-1/2' : 'w-full'} />
      ))}
    </div>
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

export function SkeletonList({ items = 4 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-10 h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-2/3" />
            <Skeleton className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="w-32 h-12" variant="rectangular" />
            <Skeleton className="w-32 h-12" variant="rectangular" />
          </div>
        </div>
        <Skeleton variant="rectangular" className="aspect-video" />
      </div>
    </div>
  );
}

export function SkeletonNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-medical-surface-200 z-sticky">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Skeleton className="w-32 h-10" variant="rectangular" />
        <div className="hidden md:flex items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-4" />
          ))}
        </div>
        <Skeleton className="w-24 h-10" variant="rectangular" />
      </div>
    </div>
  );
}
