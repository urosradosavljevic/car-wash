import React from 'react'
import styles from '../styles/Login.module.scss'

interface Props {

}

export const Login: React.FC<Props> = () => {
    return (<div className={styles.login_container}>
        <label>Email</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
        <button type="submit">Login</button>
    </div>);
}