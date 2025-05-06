import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { logout } from '../features/userSlice'

function Header({title,description}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  let [isOpen,setIsOpen]=useState(false)
  const handleLogout=()=>{
    axios.post("/api/u/logout",{},{withCredentials:true})
    .then(()=>{
      setIsOpen(false)
      dispatch(logout())
      toast.success("Logged out successfully")
      navigate("/")
    })
  }
  return (
    <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="w-8 h-8 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center text-gray-700" onClick={()=>setIsOpen(prev=>!prev)}  >
            A
            {isOpen && (
              <div onClick={handleLogout} 
               className="absolute z-10 right-5 top-18 w-fit px-4 py-2 bg-white rounded-md shadow-lg border border-gray-200">
                Logout
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Header