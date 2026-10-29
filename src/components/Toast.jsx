import React, { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const typeStyles = {
    success: 'bg-on-surface text-surface border-secondary/40',
    info: 'bg-on-surface text-surface border-primary/40',
    warning: 'bg-amber-950 text-amber-100 border-amber-600/40',
    error: 'bg-red-950 text-red-100 border-red-600/40',
  };

  const icons = {
    success: 'check_circle',
    info: 'info',
    warning: 'warning',
    error: 'error',
  };

  const iconColors = {
    success: 'text-secondary-fixed-dim',
    info: 'text-primary-fixed-dim',
    warning: 'text-amber-400',
    error: 'text-rose-400',
  };

  const currentType = toast.type || 'success';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-sm w-[calc(100vw-2.5rem)] animate-slideUp"
    >
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md ${typeStyles[currentType]}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`material-symbols-outlined text-[20px] flex-shrink-0 ${iconColors[currentType]}`}>
            {icons[currentType]}
          </span>
          <div className="flex flex-col min-w-0">
            {toast.title && <strong className="text-xs font-bold truncate">{toast.title}</strong>}
            <span className="text-xs text-slate-300 leading-tight">{toast.message}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors flex-shrink-0"
          aria-label="Fechar notificação"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}

