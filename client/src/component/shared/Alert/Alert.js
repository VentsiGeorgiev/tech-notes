import styles from './Alert.module.scss';

function Alert({ message, msgType }) {
    return (
        <div className={styles['error__container']}>
            <p className={styles['error']}>{message}</p>
        </div>
    );
}

export default Alert;