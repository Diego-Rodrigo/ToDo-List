import { ChangeEvent, FormEvent, useState } from 'react'
import { ClipboardText, PlusCircle } from 'phosphor-react'

import { Task } from '../Task/Task'
import { TasksProps } from '../../App'

import styles from './Tasks.module.css'


interface PropsTasks {
    tasks: TasksProps[];
    onAddNewTask: (taskTitle: string) => void;
    onDeleteTask: (taskId: string) => void;
    onCompletedTask: (taskId: string) => void;
}

export function Tasks({tasks, onAddNewTask, onDeleteTask, onCompletedTask}: PropsTasks) {
    
    const [newTitleTaskText, setNewTitleTaskText] = useState('');       

    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
   
    //Função de Criar uma nova tarefa
    function handleCreateNewTask(event:FormEvent){

        event.preventDefault(); 

        onAddNewTask(newTitleTaskText)
               
        setNewTitleTaskText('');
    }  
    
    //Função armazena o evento do input ("Titulo da Tarefa")
    function handleNewTitleTaskChange(event:ChangeEvent<HTMLInputElement>){
        
        setNewTitleTaskText(event.target.value)
    }   

    return(

        <main className={styles.tasksContent}>

            <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>

                <input 
                    name="title" 
                    placeholder="Adicione um nova tarefa" 
                    type="text" 
                    onChange={handleNewTitleTaskChange} 
                    value={newTitleTaskText}
                    required
                />

                <button>
                    Criar 
                    <PlusCircle size={20} />
                </button>

            </form>  

            <header className={styles.header}>
                <div>
                    <span>Tarefas criadas</span>
                    <strong>{tasksQuantity}</strong>
                </div>

                <div className={styles.purpleText}>
                    <span >Concluidas</span>
                    <strong>{completedTasks} de {tasksQuantity}</strong>
                </div>    
            </header>

            {tasksQuantity <= 0 && (
                <div className={styles.list}>                
                    <div className={styles.emptyToDoList}>
                        <ClipboardText size={60} />
                        <strong>Voce ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                </div>
            )}
                
           
                {tasks.map(task => {                
                    return(
                        <Task
                            key={task.id}
                            task={task}
                            onCompletedTask={onCompletedTask}
                            onDeleteTask={onDeleteTask}
                        />
                    )
                    })
                }                            
            
        </main>
    )
}