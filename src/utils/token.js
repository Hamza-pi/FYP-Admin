let token = JSON.parse(localStorage.getItem("user"))?.token
export const setToken=(usertoken)=>{
    token=token?token:usertoken
}
export const removeToken = ()=>{
    localStorage.removeItem("user")
    token=null
}
export {token}