import { FormEvent, useEffect } from 'react'
import { Link, redirect } from 'react-router-dom'
import styles from './styles.module.scss'

export function Auth() {

    const submitForm = (event: FormEvent) => {
        event.preventDefault()

        localStorage.setItem('isLogged', 'true')

        location.reload()
    }

    return (
        <div className={styles.authArea}>
            <h2>Login</h2>
            <form onSubmit={(event) => submitForm(event)}>
                <input type="text" placeholder="Usuário" required />
                <input type="password" placeholder="Senha" required />
                <button type="submit">Entrar</button>
            </form>

            <Link to="" className={styles.authLink} >Ainda não tem uma conta?</Link>
        </div>
    )
}