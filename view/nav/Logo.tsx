import React from 'react'
import { BsDropletHalf } from 'react-icons/bs/';
import styles from './Navigation.module.scss';

export const NavLogo: React.FC = () => {
    return <div className={styles.navLogo}><BsDropletHalf fontSize="4rem" style={{ margin: "auto", display: "block" }} /></div>;
}