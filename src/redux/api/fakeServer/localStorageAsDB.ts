const TOKEN_BY_LOGIN = 'TOKEN_BY_LOGIN'
const QUERIES_BY_TOKEN = 'QUERIES_BY_TOKEN'

export const lsDB = {
  addUserToken(login: string, token: string) {
    const newStateItem = {[login]: token}
    const prevStateStr = localStorage.getItem(TOKEN_BY_LOGIN)
    const newStateObj = prevStateStr ? {...JSON.parse(prevStateStr), ...newStateItem} : {...newStateItem}
    const newStateStr = JSON.stringify(newStateObj)
    localStorage.setItem(TOKEN_BY_LOGIN, newStateStr)
  }
}