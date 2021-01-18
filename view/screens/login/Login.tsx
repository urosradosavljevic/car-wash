import React, { useRef, useState, useEffect } from 'react'
import Load from 'react-loader-spinner'

import { useProgressContext } from '../../../shared/context/ProgressContext'
import styles from './Login.module.scss'

const Loader = () => <Load
    type="Oval"
    color="#fff"
    height={18}
    width={18}
    timeout={1000}
/>

export const Login: React.FC = () => {
    const { nextStep } = useProgressContext();
    const timer = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        return () => {
            timer.current && clearTimeout(timer.current);
        };
    }, []);

    const tryLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            timer.current = setTimeout(() => {
                nextStep()
                setLoading(false);
            }, 500);
        }
    }

    return (<div className={styles.login_container}>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
        </div>
        <div>
            <label htmlFor="pass">Password</label>
            <input id="pass" type="password" />
        </div>
        <button type="submit" className={styles.login_btn} onClick={tryLogin}>{loading ? <Loader /> : "Login"}</button>
    </div>);
}