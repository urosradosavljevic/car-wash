import React, { useRef, useState } from 'react'
import Load from 'react-loader-spinner'
import styles from '../styles/steps/Login.module.scss'
import { StepsState } from '../constants/types/Steps';

interface Props {
    steps: StepsState;
    nextStep: () => void;
}

const Loader = () => <Load
    type="Oval"
    color="#fff"
    height={18}
    width={18}
    timeout={1000}
/>

export const Login: React.FC<Props> = ({ steps, nextStep }) => {
    const timer = useRef<NodeJS.Timeout>();
    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        return () => {
            timer.current && clearTimeout(timer.current);
        };
    }, []);

    const tryLogin = () => {
        if (!loading) {
            //   setSuccess(false);
            setLoading(true);
            console.log("logging in ")
            console.log("step: ", steps)
            timer.current = setTimeout(() => {
                console.log("logged in")
                nextStep()
                // setSuccess(true);
                setLoading(false);
            }, 700);
        }
    }
    return (<div className={styles.login_container}>
        <div>
            <label>Email</label>
            <input type="email" />
        </div>
        <div>
            <label>Password</label>
            <input type="password" />
        </div>
        <button type="submit" className={styles.login_btn} onClick={() => tryLogin()}>{loading ? <Loader /> : "Login"}</button>
    </div>);
}