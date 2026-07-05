import { ModalType } from './modalSlice';

export const MODAL_TITLES: Record<Exclude<ModalType, null>, string> = {
    login: 'Вход',
    register: 'Регистрация',
    createPost: 'Создать пост',
};
