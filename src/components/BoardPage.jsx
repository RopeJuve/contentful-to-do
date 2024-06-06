import NavBar from "./NavBar/NavBar"
import SideBar from "./SideBar/SideBar"
import ToDoBoard from "./ToDoBoard/ToDoBoard"
import { useState,useEffect } from 'react'
import {createClient} from 'contentful'

const BoardPage = () => {
    const [data, setData] = useState([])

    const client = createClient({
        space: import.meta.env.VITE_SPACE_ID,
        environment: 'master',
        accessToken: import.meta.env.VITE_ACCESS_TOKEN
      })

      const getAll = async (type="toDoBoard") => { 
        try {
          const entry= await client.getEntries({
            content_type: type
          })
          
          setData(entry?.items)  
    
        } catch (er) {
          console.log(er.message)
        }
        }
        
         useEffect(() => {
           getAll()
         }, [])

console.log(data)
const board = [
    {
        _id: "6651ae725fe9fc40536c40c6",
        title: "Next.js",
        columns: [
          {
            title: "To Do",
            tasks: [
              {
                title: "test",
                taskDescription: "asolbhcasliucbas",
                isCompleted: false,
                subtasks: [
                  {
                    subtaskDescription: "sacac",
                    isCompleted: false,
                    _id: "6653cc7159f80182fd20abb0",
                    createdAt: "2024-05-26T23:57:37.212Z",
                    updatedAt: "2024-05-26T23:57:37.212Z"
                  },
                  {
                    subtaskDescription: "routing",
                    isCompleted: false,
                    _id: "6653cc7159f80182fd20abb1",
                    createdAt: "2024-05-26T23:57:37.213Z",
                    updatedAt: "2024-05-26T23:57:37.213Z"
                  }
                ],
                status: "To Do",
                _id: "6653cc7159f80182fd20abaf",
                createdAt: "2024-05-26T23:57:37.213Z",
                updatedAt: "2024-05-26T23:57:37.213Z"
              },
              {
                title: "remove the subtask",
                taskDescription: "sj/vdlbasv/V",
                isCompleted: false,
                subtasks: [
                  {
                    subtaskDescription: "routing",
                    isCompleted: false,
                    _id: "6653ce1b59f80182fd20ac17",
                    createdAt: "2024-05-27T00:04:43.240Z",
                    updatedAt: "2024-05-27T00:04:43.240Z"
                  },
                  {
                    subtaskDescription: "sacac",
                    isCompleted: false,
                    _id: "6653ce1b59f80182fd20ac18",
                    createdAt: "2024-05-27T00:04:43.240Z",
                    updatedAt: "2024-05-27T00:04:43.240Z"
                  }
                ],
                status: "To Do",
                _id: "6653ce1b59f80182fd20ac16",
                createdAt: "2024-05-27T00:04:43.240Z",
                updatedAt: "2024-05-27T00:04:43.240Z"
              },
              {
                title: "test",
                taskDescription: "asCXc",
                isCompleted: false,
                subtasks: [
                  {
                    subtaskDescription: "test1",
                    isCompleted: false,
                    _id: "6653d00e59f80182fd20ac52",
                    createdAt: "2024-05-27T00:13:02.073Z",
                    updatedAt: "2024-05-27T00:13:02.073Z"
                  }
                ],
                status: "To Do",
                _id: "6653d00e59f80182fd20ac51",
                createdAt: "2024-05-27T00:13:02.073Z",
                updatedAt: "2024-05-27T00:13:02.073Z"
              }
            ],
            _id: "6651be56cf06cde1dda54e4d",
            createdAt: "2024-05-25T10:32:54.126Z",
            updatedAt: "2024-05-27T00:13:02.073Z"
          },
          {
            title: "In Progress",
            tasks: [
              {
                title: "eknsadv",
                taskDescription: "ascasca",
                isCompleted: false,
                subtasks: [
                  {
                    subtaskDescription: "sacac",
                    isCompleted: false,
                    _id: "6653d975f68ed75725b1a945",
                    createdAt: "2024-05-27T00:53:09.274Z",
                    updatedAt: "2024-05-27T00:53:09.274Z"
                  }
                ],
                status: "In Progress",
                _id: "6653d975f68ed75725b1a944",
                createdAt: "2024-05-27T00:53:09.274Z",
                updatedAt: "2024-05-27T00:53:09.274Z"
              }
            ],
            _id: "6651be56cf06cde1dda54e4e",
            createdAt: "2024-05-25T10:32:54.126Z",
            updatedAt: "2024-05-27T00:53:09.275Z"
          },
          {
            title: "Done",
            tasks: [
              {
                title: "test",
                taskDescription: "sabi;lccuubaa",
                isCompleted: false,
                subtasks: [
                  {
                    subtaskDescription: "routing",
                    isCompleted: false,
                    _id: "6653d880f68ed75725b1a91d",
                    createdAt: "2024-05-27T00:49:04.382Z",
                    updatedAt: "2024-05-27T00:49:04.382Z"
                  }
                ],
                status: "Done",
                _id: "6653d880f68ed75725b1a91c",
                createdAt: "2024-05-27T00:49:04.382Z",
                updatedAt: "2024-05-27T00:49:04.382Z"
              }
            ],
            _id: "6651be56cf06cde1dda54e4f",
            createdAt: "2024-05-25T10:32:54.126Z",
            updatedAt: "2024-05-27T00:49:04.382Z"
          }
        ],
        createdAt: "2024-05-25T09:25:06.883Z",
        updatedAt: "2024-05-27T00:53:09.275Z",
        __v: 7
      }
  ]
    return (
        <>
            <NavBar title={data[0]?.fields.title} data={data} />
            <SideBar board={data} />
            <ToDoBoard board={data[0]} />
        </>
    )
}

export default BoardPage