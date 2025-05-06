export enum apiKeys {
  login = 'auth/login',
  refresh = 'auth/refresh',
  me = 'auth/me',

  //users
  getUsers = 'users',
  getUser = 'users',
  updateUser = 'users',
  deleteUser = 'users',
  assignUser = 'users/assign',
  changeUserPassword = 'users/change-password',
  createUser='users',

  //roles
  createRole = 'roles',

  // permissions
  getPermissions = 'permissions',
  getPermission = 'permissions',

  // markets
  getMarkets = 'markets',
  createMarket = 'markets',
  getMarket = 'markets',
  deleteMarket = 'markets',
  restoreMarket = 'markets/restore',

  // tables
  getTables = 'tables',
  createTable = 'tables',
  getTable = 'tables',
  updateTable = 'tables',
  deleteTable = 'tables',
  restoreTable = 'tables/restore'
}
