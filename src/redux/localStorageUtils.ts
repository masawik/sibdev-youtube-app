const TOKEN = 'token'

export const localStorageUtils = {
  setToken: (token: string): void => {
    return localStorage.setItem(TOKEN, token)
  },
  getToken: (): null | string => {
    return localStorage.getItem(TOKEN)
  },
  clearToken: (): void => {
    return localStorage.removeItem(TOKEN)
  }
}
