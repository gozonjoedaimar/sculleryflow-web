type NavItem = {
    name: string,
    path: string,
    icon?: string
}

type NavItems = {
    [key: string]: NavItem
}

export const side_nav: NavItems = {
    dashboard: {
        name: "Dashboard",
        path: "/",
        icon: "ri-home-line",
    },
    menu: {
        name: "Menu",
        path: "/menu",
        icon: "ri-file-list-3-line",
    },
    orders: {
        name: "Orders",
        path: "/orders",
        icon: "ri-restaurant-line",
    },
    tables: {
        name: "Restaurant Setup",
        path: "/tables",
        icon: "ri-armchair-line"
    },
    kitchen: {
        name: "Kitchen",
        path: "/kitchen",
        icon: "ri-knife-line",
    },
    stockroom: {
        name: "Stockroom",
        path: "/stockroom",
        icon: "ri-archive-line",
    }
};
