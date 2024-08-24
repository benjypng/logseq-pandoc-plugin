declare module './menu-items.json' {
  interface MenuItem {
    label: string
    action: string
  }

  const value: {
    menuItems: MenuItem[]
  }
  export default value
}
