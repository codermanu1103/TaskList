import './App.css';
import TaskApp from "./Components/Component_Code/TaskApp";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path='/' element={<TaskApp/>}/>
    </Routes>
  )
}

export default App
