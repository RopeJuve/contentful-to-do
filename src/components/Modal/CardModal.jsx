import styles from './CardModal.module.css';
import dots from '../../assets/icon-vertical-ellipsis.svg';
import Button from '../Button/Button';

const CardModal = ({ task, onClose}) => {
    const { title, taskDescription, id } = task;
    
    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <div id="card-modal" data-task-id={id} className={styles.cardModal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalTitle}>{title}</h1>
                        <div className={styles.headerContainer}>
                            <img
                                className={styles.menu}
                                src={dots}
                                alt="dots"
                                onClick={handleMenuToggle}
                            />
                        </div>
                    </div>
                    <p className={styles.modalDescription}>{taskDescription}</p>
                    <Button variant='primary' onClick={onClose}>Close</Button>
                </div>
            </div>
        </>
    );
};

export default CardModal;
