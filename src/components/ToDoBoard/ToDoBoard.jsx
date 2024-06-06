
import styles from './ToDoBoard.module.css'
import Column from '../Column/Column'




const ToDoBoard = ({ board }) => {

    return (
        <div className={styles.columnContainer}>
            {board?.fields.columns.map((column) => (
                <Column key={column?.id} column={column} />))}
        </div>
    )
}

export default ToDoBoard