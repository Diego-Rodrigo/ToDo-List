import { Check, CheckCircle, Trash } from 'phosphor-react'

import { TasksProps } from '../../App';

import styles from './Task.module.css'


interface PropsTask {
    task: TasksProps;
    onDeleteTask: (taskId: string) => void;
    onCompletedTask: (taskId: string) => void;
}


export function Task({task, onDeleteTask, onCompletedTask}:PropsTask){

    //Função repassada pela props para excluir Tarefa
    function handleDeleteTask(){        
       onDeleteTask(task.id);
    }
    //Função repassada pela props alterar Tarefa se está completa ou incompleta
    function handleIsCompletedTask(){
        onCompletedTask(task.id);
        console.log(onCompletedTask(task.id));
    }

    return(   
        <div className={styles.task}>

            <button 
             className={styles.checkContainer}
             onClick={handleIsCompletedTask}              
            >                           
               {task.isCompleted ? <Check size={18} weight='bold'/> : <div/>}

            </button>

            <p className={task.isCompleted ? styles.textCompleted : ''} >
                {task.title}
            </p>                
              
            <button 
             onClick={handleDeleteTask}
             title='Exluir Tarefa' 
             className={styles.deleteButton}>
                <Trash size={20} />
            </button>
                        
        </div>        
        
    )      
    
}