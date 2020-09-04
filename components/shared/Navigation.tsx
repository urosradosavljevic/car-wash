import React from 'react'
import Link from 'next/link'

import styles from '../../styles/sidenav/Navigation.module.scss';
import { sidebarNavItems } from '../../constants/navItems';


interface MenuItemProps {
    Icon: JSX.Element;
    title: string;
    route: string;
}

export const Navigation: React.FC = () => {
    return (<ul
        className={styles.list}
    >
        {sidebarNavItems.map((item, index) => (
            <MenuItem key={index} Icon={item.icon} title={item.title} route={item.route} />
        ))}
    </ul>
    );
}


const MenuItem: React.FC<MenuItemProps> = ({ Icon, title, route }) => {

    return (
        <Link href={route}>
            <a className={styles.link}>
                <div className={styles.listItem}>
                    <div className={styles.iconPlaceholder} >
                        {Icon}
                        {/* <Tooltip title={title} arrow placement="right" >
                            {Icon}
                        </Tooltip> */}
                    </div>
                    <div className={styles.textPlaceholder} >
                        {title}
                    </div>
                </div>
            </a>
        </Link>
    );
};