import { useState } from 'react';
import styles from './Card.module.css'
import CardModal from '../Modal/CardModal';


const Card = ({ task }) => {
    const { title, id, taskDescription } = task;
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', id);
        console.log('dragstart', id);
    };

    const handleDragEnd = () => {
        console.log('dragend', id);
    };

    return (
        <>

            <div
                className={styles.card}
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => setModalVisible(true)}
            >
                <h2 className={styles.cardTittle}>{title}</h2>
                <p className={styles.cardSubtasks}>{taskDescription}</p>
            </div>
            {modalVisible && (<CardModal task={task} onClose={() => setModalVisible(false)} />)}
        </>
    );
};

export default Card;