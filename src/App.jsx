import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import authService from './appwrite/Auth'
import{login, logout} from './store/AuthSlice'
import { Footer, Header } from './Index'
import { Outlet } from 'react-router-dom'

function App() {
  //console.log(import.meta.env.VITE_APPWRITE_URL)
  const [loading , setLoading ] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

//   window.localStorage.clear();
// window.sessionStorage.clear();


  return !loading ?  
    <div className='w-full min-h-screen '>
          <Header />
          <Outlet />
          <Footer />
    </div>
  : null
}

export default App
