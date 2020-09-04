import React from 'react'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';

import styles from '../../styles/sidenav/SideMenu.module.scss';
import UIStore from '../../stores/UIStore';
import { Navigation } from './Navigation';
import { MenuToggle } from './MenuToggle';
import { NavLogo } from './Logo';

interface Props {
    uiStore?: UIStore;
}

export const SideMenu: React.FC<Props> = inject("uiStore")(observer(({ uiStore }) => {
    const ui = uiStore!;
    return (
        <nav
            className={clsx(styles.nav, ui.isNavOpen ? styles.nav_open : styles.nav_closed)}
        >
            <Navigation />
            <MenuToggle />
            <NavLogo />
        </nav>
    );
}))