import { useContext } from "react"
import { StatsCard } from "./StatsCard"
import { TasksContext } from "../../Context/TasksContext"


export const StatsCards: React.FC = () => {
   const { tasks } = useContext(TasksContext)

   // Total de tarefas
   const totalTasks = tasks.length

   // Tarefas pendentes (done === False)
   const totalPending = tasks.filter( task => !task.taskDone )

   // Tarefas finalizadas
   const totalFinished = totalTasks - totalPending.length


   return (
      <>
         <StatsCard title="Total de Tarefas" value={totalTasks} />
         <StatsCard title="Tarefas Pendentes" value={totalPending.length} />
         <StatsCard title="Tarefas Concluídas" value={totalFinished} />
      </>
   )
}
