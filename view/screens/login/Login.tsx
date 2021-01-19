import React, { useRef, useState, useEffect } from 'react'
import Load from 'react-loader-spinner'
import { observer } from 'mobx-react-lite'

import { useProgressContext } from '../../../shared/context/ProgressContext'
import styles from './Login.module.scss'
import { PROGRESS_STEP } from '../../../shared/constants/progress'
import { useUIStore } from '../../../shared/providers/RootStoreProvider'

const Loader = () => <Load
    type="Oval"
    color="#fff"
    height={18}
    width={18}
    timeout={1000}
/>

export const Login: React.FC = observer(() => {
    const uiStore = useUIStore();
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
                setLoading(false);
                nextStep();
                uiStore.submitProgressBar(PROGRESS_STEP.LOGIN);
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
})