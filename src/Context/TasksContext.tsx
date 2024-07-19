import { createContext, useEffect, useState } from "react"


/* Interface criada pois o provider precisa da propriedade
'children' para que possa receber outros componentes (tags HTML).  */
interface TasksProviderProps {
   children: React.ReactNode
}

// Interface do estado 'tasks' que é um array.
export interface TasksProps {
   id: number
   title: string
   taskDone: boolean
}

// Interface para tipar o que é o array 'tasks' e a função 'setTasks' do estado.
interface TasksContextData {
   tasks: TasksProps[]
   setTasks: React.Dispatch<React.SetStateAction<TasksProps[]>>
   handleTaskToggle: (taskId: number) => void
}


// Esse é o contexto
export const TasksContext = createContext({} as TasksContextData)


export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
   const [tasks, setTasks] = useState([] as TasksProps[])
   /* [ { title: 'Tarefa 1', taskDone: boolean, id: number } ] */


   /* Pega o conteúdo do localStorage quando a aplicação montar. */
   useEffect(() => {
      const tasksOnLocalStorage = localStorage.getItem("Tasks")

      /* Se tiver tarefas no localStorage, pega elas,
      transforma em objeto do TS e através do setTasks,
      coloca no array tasks */
      if (tasksOnLocalStorage) {
         setTasks(JSON.parse(tasksOnLocalStorage))
      }
   }, [])


   // Mudando o taskDone da tarefa (função usada no input)
   function handleTaskToggle(taskId: number) {
      const newTasks = tasks.map((task) => {
         if (taskId === task.id) {
            return {
               ...task,
               taskDone: !task.taskDone
            }
         }
         return task
      })
      setTasks(newTasks)

      /* Salvando no localStorage a tarefa com o taskDone atualizado. */
      localStorage.setItem('Tasks', JSON.stringify(newTasks))
   }



   return (
      <TasksContext.Provider value={
         {
            tasks,
            setTasks,
            handleTaskToggle
         }
      }>{children}</TasksContext.Provider>
   )
}
