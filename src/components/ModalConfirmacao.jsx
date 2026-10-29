import React, { useEffect } from 'react';

export default function ModalConfirmacao({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirmar', isDestructive = true }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 dark:bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-surface-container-lowest dark:bg-slate-800 rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-slate-700 max-w-md w-full p-6 space-y-4 animate-scaleUp transition-colors">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDestructive ? 'bg-red-100 dark:bg-rose-950/60 text-red-600 dark:text-rose-400' : 'bg-primary-fixed dark:bg-indigo-950 text-primary dark:text-indigo-300'}`}>
            <span className="material-symbols-outlined text-[24px]">
              {isDestructive ? 'delete_forever' : 'help'}
            </span>
          </div>
          <div className="space-y-1">
            <h3 id="confirm-title" className="text-base font-bold text-on-surface dark:text-slate-100">
              {title}
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-300 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-surface-container dark:border-slate-700">
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-h-[44px]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className={`px-4 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm transition-all active:scale-[0.98] min-h-[44px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-600'
                : 'bg-primary-container hover:bg-primary focus-visible:ring-primary'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
