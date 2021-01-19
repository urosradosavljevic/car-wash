import React from 'react'
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import styles from './Menu.module.scss';
import { Navigation } from '../nav/Navigation';
import { MenuToggle } from '../nav/MenuToggle';
import { NavLogo } from '../nav/Logo';
import { useUIStore } from '../../shared/providers/RootStoreProvider';

export const Menu: React.FC = observer(() => {
    const uiStore = useUIStore();

    return (
        <nav
            className={clsx(styles.nav, uiStore.isNavOpen ? styles.nav_open : styles.nav_closed)}
        >
            <Navigation />
            <MenuToggle />
            <NavLogo />
        </nav>
    );
})