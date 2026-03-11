'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { modalVariants, backdropVariants } from '@/lib/motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

/**
 * Premium Modal Component with enhanced animations
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: ModalProps) {
  // Close on escape key and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Lock body scroll and prevent touch move on iOS
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      // Store scroll position to restore later
      document.body.style.setProperty('--scroll-y', `${window.scrollY}px`);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
      // Restore scroll position
      const scrollY = document.body.style.getPropertyValue('--scroll-y');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        document.body.style.removeProperty('--scroll-y');
      }
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && closeOnBackdropClick) {
        onClose();
      }
    },
    [onClose, closeOnBackdropClick]
  );

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-[95vw] w-full',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-medical-primary-900/60 backdrop-blur-md z-modal"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-modal flex items-center justify-center pointer-events-none">
            <motion.div
              className={cn(
                'w-full mx-4 bg-white rounded-sm shadow-medical-xl overflow-hidden pointer-events-auto',
                'max-h-[calc(100vh-2rem)] overflow-y-auto',
                sizeClasses[size]
              )}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-medical-surface-200 bg-medical-surface-50/50">
                <motion.h2
                  id="modal-title"
                  className="text-lg font-medium text-medical-primary-900 font-secondary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {title}
                </motion.h2>
                {showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    className="p-2 text-medical-text-tertiary hover:text-medical-primary-900 hover:bg-medical-surface-100 rounded-sm transition-all"
                    aria-label="Close modal"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Content with smooth entry */}
              <motion.div
                className="px-4 sm:px-6 py-4 sm:py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Modal with slide-up animation (for mobile)
 */
export function ModalSlideUp({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const slideUpVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: '100%',
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-medical-primary-900/60 backdrop-blur-md z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-x-0 bottom-0 z-modal">
            <motion.div
              className={cn(
                'bg-white rounded-t-sm shadow-medical-xl max-h-[90vh] overflow-y-auto',
                size === 'full' ? 'w-full' : 'w-full max-w-2xl mx-auto'
              )}
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-medical-surface-200 sticky top-0 bg-white">
                <h2 className="text-lg font-medium text-medical-primary-900 font-secondary">
                  {title}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-medical-surface-100 rounded-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Modal with side panel animation (for drawers)
 */
export function ModalSidePanel({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = 'md',
}: ModalProps & { position?: 'left' | 'right'; width?: 'sm' | 'md' | 'lg' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const widthClasses = {
    sm: 'w-full max-w-sm',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
  };

  const sidePanelVariants = {
    hidden: { x: position === 'right' ? '100%' : '-100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      x: position === 'right' ? '100%' : '-100%',
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-medical-primary-900/60 backdrop-blur-md z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div
            className={cn(
              'fixed top-0 h-full z-modal overflow-y-auto bg-white shadow-medical-xl',
              position === 'right' ? 'right-0' : 'left-0',
              widthClasses[width]
            )}
            variants={sidePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-medical-surface-200 sticky top-0 bg-white">
              <h2 className="text-lg font-medium text-medical-primary-900 font-secondary">
                {title}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-medical-surface-100 rounded-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-6">{children}</div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
