import React, { useRef, useState, useEffect } from 'react'
import Load from 'react-loader-spinner'
import styles from './Login.module.scss'

interface Props {
    nextStep: () => void;
}

const Loader = () => <Load
    type="Oval"
    color="#fff"
    height={18}
    width={18}
    timeout={1000}
/>

export const Login: React.FC<Props> = ({ nextStep }) => {
    const timer = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        return () => {
            timer.current && clearTimeout(timer.current);
        };
    }, []);

    const tryLogin = () => {
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
        <button type="submit" className={styles.login_btn} onClick={() => tryLogin()}>{loading ? <Loader /> : "Login"}</button>
    </div>);
}