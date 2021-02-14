const TOKEN = 'token'

export const localStorageUtils = {
  setToken: (token: string) => {
    return localStorage.setItem(TOKEN, token)
  },
  getToken: () => {
    return localStorage.getItem(TOKEN)
  },
  clearToken: () => {
    return localStorage.removeItem(TOKEN)
  }
}
