import { useState } from 'react'
import styles from './AddTaskModal.module.css'
import Button from "../Button/Button"
import Input from "../Input/Input"

const AddTaskModal = () => {
    const [formData, setFormData] = useState({
        title: '',
        taskDescription: '',
        isCompleted: false,
        status: 'To Do'
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1>Add New Task</h1>
            <div className={styles.content}>
                <label htmlFor="title">Title</label>
                <Input id='title' name='title' type='text' placeholder="Task title" onChange={handleInputChange} />
            </div>
            <div className={styles.content}>
                <label htmlFor="taskDescription">Description</label>
                <textarea id='taskDescription' name='taskDescription' className={styles.textArea} rows="4" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." onChange={handleInputChange} />
            </div>
            <div className={styles.content}>
                <span>Status</span>
                <select name='status' className={styles.selectContainer} type='text' onChange={handleInputChange} value={formData.status}>
                    <option value='To Do'>To Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
            </div>
            <Button type='submit' variant="primary">Add Task</Button>
        </form>
    )
}

export default AddTaskModal