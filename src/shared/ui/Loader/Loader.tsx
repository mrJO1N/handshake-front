import { FC, } from 'react';
import styles from './Loader.module.sass';


interface LoaderProps {
}

export const Loader: FC<LoaderProps> = ({
    ...rest
}) => {
    return (
        <div
            {...rest}
        >
            loading
        </div>
    );
};