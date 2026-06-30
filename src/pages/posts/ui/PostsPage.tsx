import { NavLink, Link } from 'react-router-dom';
import { RegisterModal } from '@/features/auth-register';
// import { useAuthModals } from '../model/usePostModals';
import styles from './Header.module.sass';

import { Button } from '@/shared/ui';
import { PostList } from '@/widgets/post-list';

export const PostsPage = () => {
    //   const { active, openPostCreation, close } = useAuthModals();

    return (
        <><PostList /></>
    );
};