import styles from './Header.module.css'

import LogoToDo from '../../assets/logo.svg';

export function Header(){

    return(
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <img src={LogoToDo} alt="To Do List" />                
            </div>                     
        </header>
    )
}