import React from 'react'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';

import styles from './Menu.module.scss';
import UIStore from '../../shared/stores/UIStore';
import { Navigation } from '../nav/Navigation';
import { MenuToggle } from '../nav/MenuToggle';
import { NavLogo } from '../nav/Logo';

interface Props {
    uiStore?: UIStore;
}

export const Menu: React.FC<Props> = inject("uiStore")(observer(({ uiStore }) => {
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