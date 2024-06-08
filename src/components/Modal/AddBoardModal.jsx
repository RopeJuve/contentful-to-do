import styles from "./AddBoardModal.module.css"
import Button from "../Button/Button"
import Input from "../Input/Input"
import { useState } from "react";
import { createBoard } from "../../creteData/createData";
import { useBoard } from "../../context/BoardContext";


const AddBoardModal = ({ remove }) => {
    const { getAll } = useBoard();  
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        columns: [{ title: 'To Do' }, { title: 'In Progress' }, { title: 'Done' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleColumnChange = (e, index) => {
        const { value } = e.target;
        const columns = [...formData.columns];
        columns[index].title = value;
        setFormData({
            ...formData,
            columns
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) {
            setError(true);
            return;
        } else {
            setError(false);
            console.log(formData)
            const data = await createBoard(formData);
            console.log(data);
            remove();
            getAll();
        }
    }


    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h2>Add New Board</h2>
            <div className={styles.addBoardTitleWrapper}>
                <label htmlFor="title">Board Name</label>
                <Input name="title" type="text" placeholder="Enter board title" onChange={handleChange} error={error} />
            </div>
            <div className={styles.addBoardTitleWrapper}>
                <label htmlFor="column">Board Columns</label>
                {formData.columns.map((column, index) => (
                    <Input key={`column-name-${index}`} name="column" type="text" placeholder="Enter column title" value={column.title} onChange={(e) => handleColumnChange(e, index)} />
                ))}
            </div>
            <Button variant='primary'>Create Board</Button>
        </form>
    )
}

export default AddBoardModal