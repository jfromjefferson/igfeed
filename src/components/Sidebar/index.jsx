import { PencilLine } from 'phosphor-react'
import { Profile } from '../Profile'
import styles from './styles.module.scss'

export function Sidebar({ user }) {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src={user.coverImage}
            />

            <Profile hasBorder={true} isSidebar={true} image={user.image} />

            <div className={styles.profileArea}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
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