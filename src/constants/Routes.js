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

export const routeNotifications = () => ({
  id: 'notifications',
  title: 'Bildirimler'
})

export const routeFriends = (sceneConfig) => ({
  id: 'friends',
  title: 'Friends',
  showTabs: false,
  sceneConfig
})

export const routeChooseFriends = () => ({
  id: 'choosefriends',
  title: 'Choose friends',
  showTabs: false,
})

export const routeInviteFriends = () => ({
  id: 'invitefriends',
  title: 'Invite friends',
  showTabs: false,
})

export const routeVoteView = (voteId) => ({
  id: 'voteview',
  displayNavbar: false,
  showTabs: false,
  voteId
})

export const routeVote = (source, description) => ({
  id: 'vote',
  title: 'Choose one!',
  showTabs: false,
  source,
  description
})

export const routeSplash = () => ({
  id: 'splash',
  displayNavbar: false,
  showTabs: false
})
