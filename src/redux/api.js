import axios from 'axios'

// backend url latest working:https://blog-backend-luim.onrender.com
//backend url previous working:https://blog-server-last-test.vercel.app

const API= axios.create({baseURL:"http://localhost:5000"})

export const signUp= (formValue) => API.post("/users/createUser", formValue) //*like Register
export const signIn= (formValue) => API.post("/users/login", formValue) //*like Register

export  const findUserId=(userId)=> API.get(`/users/findUserById/${userId}`)