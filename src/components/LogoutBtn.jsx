import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../Store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    type="button"
    className="text-[16px] font-semibold text-primary-text hover:border-b-2 hover:border-primary-accent pb-0.5 px-2 min-h-11 transition-all"
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn