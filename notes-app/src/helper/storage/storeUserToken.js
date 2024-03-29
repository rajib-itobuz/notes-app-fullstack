export const setUserToken = (token) => {
    localStorage.setItem("userToken", token)
}
export const getUserToken = () => {
    return localStorage.getItem("userToken")
}