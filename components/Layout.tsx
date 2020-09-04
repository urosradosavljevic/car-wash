import React, { ReactNode } from 'react'
import Head from 'next/head'

import styles from "../styles/Layout.module.scss"
import { SideMenu } from './shared/SideMenu'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title }: Props) => (
    <>
        <Head>
            <title>{title} | Car Wash Service</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className={styles.body}>
            <SideMenu />
            {children}

        </div>
        {/* <footer >
             <img src="/car.svg" alt="Car Logo" className={styles.logo} /> 
<img src="/car.svg" alt="Car Logo" />
        </footer > */}
    </>

)

export default Layout
