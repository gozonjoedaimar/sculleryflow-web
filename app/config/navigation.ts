type NavItem = {
    name: string,
    path: string,
    icon?: string
}

type NavItems = {
    [key: string]: NavItem
}

export const side_nav: NavItems = {
	home: {
		name: "Home",
		path: "/",
		icon: "ri-home-line",
	},
	menu: {
		name: "Menu",
		path: "/menu",
        icon: "ri-file-list-3-line",
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
	},
};