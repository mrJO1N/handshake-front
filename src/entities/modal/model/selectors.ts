import type { ModalState } from './modalSlice';

interface ModalRootState {
    modal: ModalState;
}

export const selectModalActive = (s: ModalRootState) => s.modal.active;
