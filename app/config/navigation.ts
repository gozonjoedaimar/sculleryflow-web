type NavItem = {
    name: string,
    path: string
}

type NavItems = {
    [key: string]: NavItem
}

export const side_nav: NavItems = {
    home: {
        name: 'Home',
        path: '/'
    },
    menu: {
        name: 'Menu',
        path: '/menu'
    },
    menu_item: {
        name: 'Menu Item',
        path: '/menu/item'
    },
}