import React from 'react';

export default function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="bg-surface-container-lowest dark:bg-slate-800/80 rounded-xl shadow-sm p-4 sm:p-6 space-y-4 border border-outline-variant/30 dark:border-slate-700 animate-pulse transition-colors"
    >
      {/* Top Badges Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-36 bg-surface-container dark:bg-slate-700 rounded-md"></div>
          <div className="h-5 w-20 bg-surface-container dark:bg-slate-700 rounded-md"></div>
        </div>
        <div className="h-6 w-6 bg-surface-container dark:bg-slate-700 rounded-lg"></div>
      </div>

      {/* Title & Desc Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-4/5 bg-surface-container dark:bg-slate-700 rounded-md"></div>
        <div className="h-4 w-full bg-surface-container-low dark:bg-slate-700/50 rounded-md"></div>
        <div className="h-4 w-3/4 bg-surface-container-low dark:bg-slate-700/50 rounded-md"></div>
      </div>

      {/* Metadata Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        <div className="h-12 bg-surface-container-low dark:bg-slate-700/50 rounded-lg"></div>
        <div className="h-12 bg-surface-container-low dark:bg-slate-700/50 rounded-lg"></div>
        <div className="h-12 bg-surface-container-low dark:bg-slate-700/50 rounded-lg"></div>
        <div className="h-12 bg-surface-container-low dark:bg-slate-700/50 rounded-lg"></div>
      </div>

      {/* Rationale Skeleton */}
      <div className="h-10 bg-surface-container-low dark:bg-slate-700/50 rounded-lg"></div>

      {/* Actions Skeleton */}
      <div className="pt-2 border-t border-surface-container dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-44 bg-surface-container dark:bg-slate-700 rounded-lg"></div>
          <div className="h-9 w-36 bg-surface-container dark:bg-slate-700 rounded-lg"></div>
        </div>
        <div className="h-4 w-20 bg-surface-container-low dark:bg-slate-700/50 rounded"></div>
      </div>
    </div>
  );
}
