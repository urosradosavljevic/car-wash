import React from 'react'
import clsx from 'clsx';
import Link from 'next/link'


import nav_styles from '../nav/Navigation.module.scss';
import styles from './Menu.module.scss';
import UIStore from '../../shared/stores/UIStore';
import { sidebarNavItems } from '../nav/navItems';

interface Props {
    uiStore?: UIStore;
}

export const MobileMenu: React.FC<Props> = () => {
    return (
        <nav
            className={clsx(styles.bottom_nav)}
        >
            <MobileNavigation />
        </nav>
    );
}
export const MobileNavigation: React.FC = () => {
    return (<ul
        className={nav_styles.mobile_list}
    >
        {sidebarNavItems.map((item, index) => (
            <Link key={index} href={item.route} ><a>{item.icon}</a></Link>
        ))}
    </ul>
    );
}

