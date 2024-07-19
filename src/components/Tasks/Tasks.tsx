import { FormEvent, useContext, useRef, useState } from 'react'
import { TasksContext } from '../../Context/TasksContext'

import { RiDeleteBin6Line as RecycleBinIcon } from "react-icons/ri"; // Ícone da lixeira

import styles from './styles.module.scss'


export const Tasks: React.FC = () => {
   const [taskTitle, setTaskTitle] = useState('')

   // Pega o que está sendo exportado pelo TasksContext.Provider.
   // Necessário criar uma tipagem (no TasksContext.tsx) do que será usado, se não, da erro.
   const { tasks, setTasks, handleTaskToggle } = useContext(TasksContext)

   const inputTask = useRef<HTMLInputElement>(null)



   /* Função disparada quando formulário é enviado. */
   function handleSubmit(event: FormEvent) {
      event.preventDefault()

      if (taskTitle.length < 3) {
         alert('Tarefa muito curta, digite novamente.')
         return
      }

      const newTask = [
         ...tasks,
         {
            id: new Date().getTime(),
            title: taskTitle,
            taskDone: false
         }
      ]
      // Adicionar tarefas no array tasks
      setTasks(newTask)

      /* Salvando no localStorage a tarefa. */
      localStorage.setItem('Tasks', JSON.stringify(newTask))


      setTaskTitle('') // Limpar o input ao adicionar a tarefa.    
      // Deixar o input da tarefa com foco
      if (inputTask.current) {
         inputTask.current.focus()
      }

   }


   // Botão para remover tarefa.
   function handleRemoveTaskButton(taskId: number) {
      const newTasks = tasks.filter(task => task.id !== taskId)
      setTasks(newTasks)

      // Salvando no localStorage o novo array com a tarefa desejada removida.
      localStorage.setItem('Tasks', JSON.stringify(newTasks))
   }




   return (
      <section id={styles.container}>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="input-task">Adicionar Tarefa: </label>

               <input value={taskTitle}
                  ref={inputTask}
                  onChange={(event) => setTaskTitle(event.target.value)}
                  type="text" name='task-field' id='input-task' minLength={3} maxLength={214} placeholder='Título da tarefa' />
            </div>


            <button type='submit'>Adicionar Tarefa</button>
         </form>

         <ul id={styles.content}>
            {tasks.map(task => {
               return (
                  <li key={task.id}>
                     <input onChange={() => handleTaskToggle(task.id)}
                        checked={task.taskDone ? true : false} // Tarefa fica com checked se o taskDOne for true
                        type="checkbox" name='checkbox' id={`task-${task.id}`} />

                     <label htmlFor={`task-${task.id}`} className={task.taskDone ? styles.done : ''}
                     >{task.title}</label>
                     <RecycleBinIcon onClick={() => handleRemoveTaskButton(task.id)} id={styles.trash} />
                  </li>
               )
            }
            )}
         </ul>
      </section>
   )

}
