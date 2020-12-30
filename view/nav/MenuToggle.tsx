import React from "react";
import { inject, observer } from 'mobx-react';
import { GrMenu, GrClose } from "react-icons/gr";

import styles from "./Navigation.module.scss"
import UIStore from "../../shared/stores/UIStore";

interface Props {
    uiStore?: UIStore;
}

export const MenuToggle: React.FC<Props> = inject("uiStore")(observer(({ uiStore }) => {
    const ui = uiStore!;

    return (
        <button className={styles.toogleButton_wrap} onClick={() => ui.toggleNav()}>
            <div className={styles.toogleButton}>{ui.isNavOpen ? <GrClose fontSize="2rem" /> : <GrMenu fontSize="2rem" />}</div>
        </button>
    );
}))
