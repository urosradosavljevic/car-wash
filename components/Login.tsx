import React from 'react'
import styles from '../styles/Login.module.scss'

interface Props {

}

export const Login: React.FC<Props> = () => {
    return (<div className={styles.login_container}>
        <div>
            <label>Email</label>
            <input type="email" />
        </div>
        <div>
            <label>Password</label>
            <input type="password" />
        </div>
        <button type="submit">Login</button>
    </div>);
}