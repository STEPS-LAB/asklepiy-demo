import { Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-medical-surface-50">
      {/* Hero Skeleton */}
      <div className="pt-20 pb-16 bg-gradient-to-br from-medical-primary-50 via-white to-medical-accent-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-10 w-48 bg-medical-surface-200 rounded-sm animate-pulse" />
              <div className="h-16 w-full bg-medical-surface-200 rounded-sm animate-pulse" />
              <div className="h-16 w-5/6 bg-medical-surface-200 rounded-sm animate-pulse" />
              <div className="h-6 w-full bg-medical-surface-200 rounded-sm animate-pulse" />
              <div className="flex gap-4 pt-4">
                <div className="h-14 w-48 bg-medical-surface-200 rounded-sm animate-pulse" />
                <div className="h-14 w-40 bg-medical-surface-200 rounded-sm animate-pulse" />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/5] bg-medical-surface-200 rounded-sm animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="py-16 bg-medical-primary-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="h-12 w-24 mx-auto bg-medical-surface-200 rounded-sm animate-pulse" />
                <div className="h-5 w-32 mx-auto bg-medical-surface-200 rounded-sm animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-64 mx-auto bg-medical-surface-200 rounded-sm animate-pulse mb-4" />
            <div className="h-5 w-96 mx-auto bg-medical-surface-200 rounded-sm animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" variant="rectangular" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
