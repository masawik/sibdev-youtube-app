export const localStorageUtils = {
  setToken: (token: string) => {
    return localStorage.setItem('token', token)
  },
  getToken: () => {
    return localStorage.getItem('token')
  }
}
