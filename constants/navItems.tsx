import { MdAccountBox, MdCall, MdHome } from 'react-icons/md/';


export const sidebarNavItems = [
    {
        icon: <MdHome fontSize="2rem" />,
        title: "Home",
        route: "/",
    },
    {
        icon: <MdAccountBox fontSize="2rem" />,
        title: "Profile",
        route: "/profile",
    },
    {
        icon: <MdCall fontSize="2rem" />,
        title: "Contact",
        route: "/contact",
    },
]


