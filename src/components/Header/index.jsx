import logo from '../../assets/logo.png'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} />
            <strong>igfeed</strong>
        </header>
    )
}