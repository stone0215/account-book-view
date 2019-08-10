const getters = {
  errorLogs: state => state.errorLog.logs,
  isServerAlive: state => state.global.isServerAlive,
  permission_routers: state => state.permission.routers,
  sidebar: state => state.app.sidebar
}
export default getters
