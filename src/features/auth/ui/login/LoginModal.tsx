import { Modal, type ModalProps } from '@/shared/ui';
import { LoginForm } from './LoginForm';
import { useIsMobile } from '@/shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type LoginModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
  onSwitchToRegister: () => void;
};

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  useEffect(() => {
    if (isMobile && isOpen) {
      navigate("/login")
    }

  }, [isMobile, isOpen, navigate])

  if (isMobile) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Вход">
      <LoginForm onSuccess={onClose} onSwitchToRegister={onSwitchToRegister} />
    </Modal>
  );
}
