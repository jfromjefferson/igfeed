import { PencilLine } from 'phosphor-react'
import styles from './styles.module.scss'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover} 
                src="https://images.unsplash.com/photo-1524860769472-246b6afea403?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGFja2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=250&q=40" 
            />
            
            <div className={styles.profile}>
                <img className={styles.avatar} src="https://avatars.githubusercontent.com/u/42497861?v=4" />

                <strong>Jefferson Silva</strong>
                <span>Full stack developer</span>
            </div>
            
            <footer>
                <button type="button">
                    <PencilLine />
                    Editar perfil
                </button>
            </footer>
        </aside>
    )
}