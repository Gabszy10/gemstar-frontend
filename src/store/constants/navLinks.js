const login = {
  id: 'login',
  to: '/login',
  label: 'Login',
  isLink: true
};

const register = {
  id: 'register',
  to: '/register',
  label: 'Register',
  isLink: true
};

const accountSettings = {
  id: 'account_settings',
  to: '/account',
  label: 'Account Settings',
  isLink: true
};

const projects = {
  id: 'projects',
  to: '/projects',
  label: 'Projects',
  icon: <i className="fas fa-tasks" />,
  isLink: true
};

const adminSettings = {
  id: 'admin_settings',
  to: '/admin',
  label: 'Admin Settings',
  icon: <i className="fas fa-cogs" />,
  isLink: true
};

const logout = {
  id: 'logout',
  to: '/',
  label: 'Log-out',
  isLink: true
};

const usersSettings = {
  id: 'users_settings',
  to: '/users',
  label: 'Users Settings',
  icon: <i className="fas fa-users-cog" />,
  isLink: true
};

// const profile = {
//   id: 'profile',
//   to: '/profile',
//   label: 'Profile',
//   icon: <i className="fas fa-user" />,
//   isLink: true
// };

const calendar = {
  id: 'calendar',
  to: '/calendar',
  label: 'Calendar',
  icon: <i className="far fa-calendar-alt" />,
  isLink: true
};

const notification = {
  id: 'notification',
  label: 'Notifications',
  icon: <i className="fas fa-bell" />,
  isLink: true
};

const settings = {
  id: 'settings',
  label: 'Settings',
  icon: <i className="fas fa-user" />,
  child: [accountSettings, logout]
};

const logs = {
  id: 'logs',
  label: 'Logs',
  to: '/logs',
  icon: <i className="far fa-file-alt" />,
  isLink: true
};

export const navLinks = {
  default: [login, register],
  csm: [projects, calendar, notification, settings],
  emp: [projects, calendar, notification, settings],
  owner: [
    projects,
    calendar,
    usersSettings,
    adminSettings,
    logs,
    notification,
    settings
  ]
};
