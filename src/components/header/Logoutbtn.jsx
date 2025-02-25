import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { logout } from '../../store/AuthSlice'

function Logoutbtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logOut().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='py-2 px-4 bg-red-400 hover:bg-red-500 rounded-full font-semibold' onClick={logoutHandler}>Log OUT</button>
  )
}

export default Logoutbtn