import { useEffect, useState } from 'react'

import { Header } from './components/Header/Header'
import { Tasks } from './components/ListTasks/Tasks'
import { v4 as uuidv4 } from 'uuid'

import './global.css'
import styles from './App.module.css'


export interface TasksProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {

  const [tasks, setTasks] = useState<TasksProps[]>([]) 

  //Função carrega lista de tarefas armazenada no LocalStorage
  function loadSavedTasksInLocalStorage(){

    const saved = localStorage.getItem('@ToDo:tasks-saved-1.0.0')

    if(saved){
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadSavedTasksInLocalStorage()
  },[])

  //Função salva as tarefas no LocalStorage
  function savedTasksInLocalStorage(newToDoList: TasksProps[]){

    const stateJSON = JSON.stringify(newToDoList)
    
    setTasks(newToDoList)

    localStorage.setItem('@ToDo:tasks-saved-1.0.0', stateJSON)
  }

  //Função adiciona uma nova tarefa e armazenada no LocalStorage
  function handleAddNewTask(taskTitle: string){

    savedTasksInLocalStorage([...tasks,{
      id: uuidv4(),
      title: taskTitle,
      isCompleted: false
    }])
  }

  //Função exclui uma tarefas pelo ID que está armazenada no LocalStorage
  function handleDeleteTaskById(taskId: string){
    const newToDoList= tasks.filter(task => {
        return task.id !== taskId
    })
    savedTasksInLocalStorage(newToDoList)
  }

  //Função faz alteração se a tarefa está completada ou incompleta e armazenada no LocalStorage
  function toggleIsCompletedTask(taskId: string){
    const newToDoList = tasks.map(task => {
      if(task.id === taskId) {
        return { 
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task      
    })
    savedTasksInLocalStorage(newToDoList)
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        
        <Tasks 
          tasks={tasks} 
          onAddNewTask={handleAddNewTask}
          onDeleteTask={handleDeleteTaskById}
          onCompletedTask={toggleIsCompletedTask}
       />              
        
      </main>     
               
         
    </>
    
  )
}


