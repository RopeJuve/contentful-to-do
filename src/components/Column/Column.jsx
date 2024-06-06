
import Card from '../Card/Card';
import styles from './Column.module.css'

const Column = ({ column }) => {

    const bgColor = {
        'To Do': '#49C4E5',
        'In Progress': '#8471F2',
        'Done': '#67E2AE'
    };
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.circle} style={{ backgroundColor: `${bgColor[column?.fields?.title]}` }}></div>
                <h3>{column?.fields?.title}</h3>
            </div>
            <div className={styles.taskWrapper}>
                {column?.fields?.tasks?.map((task) => (
                    <Card key={task?.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Column