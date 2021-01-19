import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect } from 'react'
import Head from 'next/head'

import styles from "./Layout.module.scss"
import { Menu } from '../menu/Menu'
import { MobileMenu } from '../menu/MobileMenu'
import { useUIStore } from '../../shared/providers/RootStoreProvider';

type Props = {
    children?: ReactNode
    title?: string
}

export const Layout: React.FC<Props> = observer(({ children, title }) => {
    const uiStore = useUIStore();

    useEffect(() => {
        window.innerWidth < 600 ? uiStore.setIsMobile(true) : uiStore.setIsMobile(false);
        window.addEventListener('resize', () => {
            window.innerWidth < 600 ? uiStore.setIsMobile(true) : uiStore.setIsMobile(false);
        })
    });

    return (
        <>
            <Head>
                <title>{title} | Car Wash Service</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.body}>
                {!uiStore.isMobile ? <Menu /> : <MobileMenu />}
                {children}
            </div>
            {/* <footer >
             <img src="/car.svg" alt="Car Logo" className={styles.logo} /> 
<img src="/car.svg" alt="Car Logo" />
        </footer > */}
        </>

    )
})