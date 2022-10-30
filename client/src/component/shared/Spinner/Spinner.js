import styles from './Spinner.module.scss';

function Spinner() {
    return (
        <div className={styles['center']}>
            <div className={styles['lds-ripple']}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;