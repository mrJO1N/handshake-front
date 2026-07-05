import { FC, ReactNode, useEffect, useRef } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIsMobile } from '@/shared/lib/hooks';
import { ModalType, MODAL_TITLES, selectModalActive } from '@/entities/modal';
import { useModal } from '../model/useModal';

import styles from './ModalPage.module.sass';

interface ModalPageRenderProps {
    navigate: NavigateFunction;
    onDone: () => void;
}

interface ModalPageProps {
    type: Exclude<ModalType, null>;
    children: (props: ModalPageRenderProps) => ReactNode;
}

export const ModalPage: FC<ModalPageProps> = ({ type, children }) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const location = useLocation();
    const active = useSelector(selectModalActive);
    const { open, close } = useModal();
    const wasOpenRef = useRef(false);

    const goBack = () => {
        if (location.key === 'default') {
            navigate('/', { replace: true });
        } else {
            navigate(-1);
        }
    };

    
    useEffect(() => {
        if (isMobile) return;
        open(type);
        return () => { close(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, type]);

    useEffect(() => {
        if (isMobile) return;

        if (active === type) {
            wasOpenRef.current = true;
            return;
        }

        if (wasOpenRef.current) {
            wasOpenRef.current = false;
            goBack();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, active, type]);

    if (!isMobile) return null;

    const onDone = () => goBack();

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>{MODAL_TITLES[type]}</h2>
            {children({ navigate, onDone })}
        </div>
    );
};
