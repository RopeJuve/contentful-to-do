import BoardPage from "./components/BoardPage"
import { BoardProvider } from "./context/BoardContext"

function App() {


  return (
    <>
      <BoardProvider>
        <BoardPage />
      </BoardProvider>
    </>
  )
}

export default App
