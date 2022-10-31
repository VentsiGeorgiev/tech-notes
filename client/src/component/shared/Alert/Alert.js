import styles from './Alert.module.scss';

function Alert({ message }) {
    return (
        <div className={styles['error__container']}>
            <p className={styles['error']}>{message}</p>
        </div>
    );
}

export default Alert;