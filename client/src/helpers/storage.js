export default {
    setToken: (x) => localStorage.setItem('access-token', `${x}`),
    getToken: () => localStorage.getItem('access-token'),
    clearToken: () => localStorage.removeItem('access-token'),
    setSidebar: (x) => localStorage.setItem('sbs', `${x}`),
    getSidebar: () => localStorage.getItem('sbs') && localStorage.getItem('sbs') == 'true'
}