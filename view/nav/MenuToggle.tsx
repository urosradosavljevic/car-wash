import React from "react";
import { observer } from 'mobx-react-lite';
import { GrMenu, GrClose } from "react-icons/gr";

import styles from "./Navigation.module.scss"
import { useUIStore } from "../../shared/providers/RootStoreProvider";

export const MenuToggle: React.FC = observer(() => {
    const uiStore = useUIStore();

    return (
        <button className={styles.toogleButton_wrap} onClick={() => uiStore.toggleNav()}>
            <div className={styles.toogleButton}>{uiStore.isNavOpen ? <GrClose fontSize="2rem" /> : <GrMenu fontSize="2rem" />}</div>
        </button>
    );
})