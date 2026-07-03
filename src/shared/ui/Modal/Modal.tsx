import { FC, type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.sass';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const CLOSE_ANIMATION_MS = 220; // держим в синхроне с .closing в Modal.module.sass

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isOpen) {
      clearTimeout(closeTimeout.current);
      setClosing(false);
      setMounted(true);
      return;
    }

    if (!mounted) return;

    setClosing(true);
    closeTimeout.current = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, CLOSE_ANIMATION_MS);

    return () => clearTimeout(closeTimeout.current);
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden'; // блок скролла фона

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={[styles.overlay, closing && styles.closing]
        .filter(Boolean)
        .join(' ')}
      onClick={onClose}
    >
      <div
        className={[styles.content, closing && styles.closing]
          .filter(Boolean)
          .join(' ')}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
        >
          ×
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  );
};
