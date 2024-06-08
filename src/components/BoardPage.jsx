import NavBar from "./NavBar/NavBar"
import SideBar from "./SideBar/SideBar"
import ToDoBoard from "./ToDoBoard/ToDoBoard"
import { useEffect } from 'react'
import { useBoard } from '../context/BoardContext'


const BoardPage = () => {
    const { getAll, selectedBoard } = useBoard()
    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
            <NavBar />
            <SideBar />
            <ToDoBoard  />
        </>
    )
}

export default BoardPage