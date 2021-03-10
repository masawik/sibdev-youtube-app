const TOKEN = 'token'

export const localStorageUtils = {
  setToken: (token: string): void => localStorage.setItem(TOKEN, token),
  getToken: (): null | string => localStorage.getItem(TOKEN),
  clearToken: (): void => localStorage.removeItem(TOKEN)
}
