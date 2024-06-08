import addColumn from '../../assets/icon-add-task-mobile.svg'
import styles from './ToDoBoard.module.css'
import Column from '../Column/Column'
import { useBoard } from '../../context/BoardContext'
import Button from '../Button/Button'




const ToDoBoard = () => {
    const { selectedBoard } = useBoard()
    console.log(selectedBoard)
    return (

        <>
            {selectedBoard?.columns?.length === 0 ? <div className={styles.emptyContainer}>
                <p>Your Board is empty</p>
                <Button variant="primary" onClick={() => setOpenModal(true)}>
                    <img src={addColumn} alt="addIcon" />
                    Add Column
                </Button> </div> :
                <div className={styles.columnContainer}>
                    {selectedBoard?.columns?.map((column) => (
                        <Column key={column?.id} column={column} />))}
                </div>}
        </>
    )
}

export default ToDoBoard