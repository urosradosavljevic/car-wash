import React, { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { inject, observer } from 'mobx-react';

import styles from "../styles/shared/Layout.module.scss"
import { Menu } from './shared/Menu'
import { MobileMenu } from './shared/MobileMenu'
import UIStore from '../stores/UIStore';

type Props = {
    children?: ReactNode
    title?: string
    uiStore?: UIStore;
}

export const Layout: React.FC<Props> = inject("uiStore")(observer(({ children, title, uiStore }) => {
    const ui = uiStore!;
    useEffect(() => {
        window.innerWidth < 600 ? ui.setIsMobile(true) : ui.setIsMobile(false);
        window.addEventListener('resize', () => {
            window.innerWidth < 600 ? ui.setIsMobile(true) : ui.setIsMobile(false);
            console.log("mobil", ui.isMobile)
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
                {!ui.isMobile ? <Menu /> : <MobileMenu />}
                {children}
            </div>
            {/* <footer >
             <img src="/car.svg" alt="Car Logo" className={styles.logo} /> 
<img src="/car.svg" alt="Car Logo" />
        </footer > */}
        </>

    )
}))
export default Layout
