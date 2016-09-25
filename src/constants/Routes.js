export const routeHome = () => ({
  id: 'home',
  title: 'Startup!'
})

export const routeLogin = () => ({
  id: 'login',
  displayNavbar: false,
  showTabs: false
})

export const routeSettings = () => ({
  id: 'settings',
  showTabs: false,
  title: 'Ayarlar'
})

export const routeUser = (username) => ({
  id: 'user',
  title: username
})

export const routeNotifications = (username) => ({
  id: 'notifications',
  title: 'Bildirimler'
})

export const routeFriends = (username) => ({
  id: 'friends',
  title: 'Choose Friends',
  showTabs: false,
})
