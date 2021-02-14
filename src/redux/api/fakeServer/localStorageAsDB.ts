const TOKEN_BY_LOGIN = 'TOKEN_BY_LOGIN'

export const lsDB = {
  addUserToken: (login: string, token: string) => {
    const newStateItem = {[login]: token}
    const prevStateStr = localStorage.getItem(TOKEN_BY_LOGIN)
    const newStateObj = prevStateStr ? {...JSON.parse(prevStateStr), ...newStateItem} : {...newStateItem}
    const newStateStr = JSON.stringify(newStateObj)
    localStorage.setItem(TOKEN_BY_LOGIN, newStateStr)
  },

  getLoginByToken: (token: string) => {
    const DbStr = localStorage.getItem(TOKEN_BY_LOGIN)
    if (!DbStr) return false
    const Db = JSON.parse(DbStr)
    for (const record of Object.entries(Db)) {
      if (token === record[1]) {
        return record[0]
      }
    }
    return false
  }
}