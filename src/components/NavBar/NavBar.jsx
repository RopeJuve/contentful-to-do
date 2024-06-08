import styles from './NavBar.module.css'
import Logo from '../../assets/logo-mobile.svg'
import Button from '../Button/Button'
import addTaskIcon from '../../assets/icon-add-task-mobile.svg'
import menu from '../../assets/icon-vertical-ellipsis.svg'
import arrowDown from '../../assets/icon-chevron-down.svg'
import { useBoard } from '../../context/BoardContext'
import Modal from '../Modal/Modal'
import { useState } from 'react'


const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {  selectedBoard, boards } = useBoard()
    const disabled = !boards ? true : false;
    return (
        <nav className={styles.container}>
            <div className={styles.logoWrapper} onClick={() => { }}>
                <img src={Logo} alt="logo" />
                <h1>Kanban</h1>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.headWrapper}>
                    <h1>{selectedBoard?.title}</h1>
                    {boards && <img className={styles.cursorPointer} src={arrowDown} alt="logo" />}
                </div>
                <div className={styles.buttonsWrapper}>
                    <Button variant="primary" disabled={disabled} onClick={() => setIsModalOpen(true)}>
                        <img src={addTaskIcon} alt="add task icon" />
                        <span className={styles.btnText}>Add New Task</span>
                    </Button>
                    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant='editButton' disabled={disabled} >
                        <img className={styles.cursorPointerMenu} src={menu} alt="menu" />
                    </Button>
                </div>
            </div>
            {isModalOpen && <Modal variant='addTask' remove={() => setIsModalOpen(false)} />}
        </nav>
    )
}

export default NavBar