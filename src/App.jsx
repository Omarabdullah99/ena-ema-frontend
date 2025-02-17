import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/features/UserSlice'


const App = () => {
  const dispatch= useDispatch()

  //!register/login korar por refresh korle oita chole jay. ai problem solve korar jonno
  const user= JSON.parse(localStorage.getItem("ecoomerce"))
  useEffect(() => {
    dispatch(setUser(user))
    
  }, [])
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
   
    </>
  )
}

export default App