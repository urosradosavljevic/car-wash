import React from 'react'
import { BsDropletHalf } from 'react-icons/bs/';
import styles from '../../styles/menu/Navigation.module.scss';

interface Props {

}

export const NavLogo: React.FC<Props> = () => {
    return <div className={styles.navLogo}><BsDropletHalf fontSize="4rem" style={{ margin: "auto", display: "block" }} /></div>;
}