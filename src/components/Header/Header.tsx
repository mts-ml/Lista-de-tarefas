import { StatsCards } from "../StatsCard/StatsCards";

import styles from './styles.module.scss'


export const Header: React.FC = () => {
   return (
      <header className={styles.header}>
         <div className={styles.container}>
            <div>
               <h1>Lista</h1>
               <span>Bem vindo, Mateus!</span>
            </div>

            <div>
               <StatsCards />
            </div>
         </div>
      </header>
   )
}
