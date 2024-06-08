import styles from './Modal.module.css'
import AddBoardModal from './AddBoardModal'
import AddTaskModal from './AddTaskModal';
import EditTask from './EditTask';

const Modal = ({ remove, variant }) => {
 
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    const handleClick = () => {
            remove();
    }
    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.modal} onClick={handleModalClick}>
                {variant === 'addBoard' && <AddBoardModal remove={remove} />}
                {variant === 'addTask' && <AddTaskModal remove={remove} />}
                {variant === 'editTask' && <EditTask  />}
            </div>
        </div>
    )
}

export default Modal