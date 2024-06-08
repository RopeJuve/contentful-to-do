import { createContext, useContext, useState } from 'react';
import { fetchBoardWithTasks } from '../fetchData/contentfulData';
import { cleanUpBoardData } from '../fetchData/utils';

const BoardContext = createContext()

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState([])
    const [selectedBoard, setSelectedBoard] = useState({})

    const getAll = async () => {
        try {
            const data = await fetchBoardWithTasks()
            const cleanData = cleanUpBoardData(data)
            console.log(cleanData)
            setBoards(cleanData)
            setSelectedBoard(cleanData[0])
        } catch (er) {
            console.log(er.message)
        }
    }
   
    return (
        <BoardContext.Provider value={{ boards, getAll, selectedBoard, setSelectedBoard }}>
            {children}
        </BoardContext.Provider>
    )
}