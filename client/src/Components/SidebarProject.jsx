import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'

function SidebarProject({workspace}) {
    const dispatch=useDispatch()
    const [projects,setProjects]=useState(null)
    useEffect(()=>{
        if(workspace){
            axios.get(`/api/p/all/${workspace.id}`,{withCredentials: true})
            .then( ({data})=>{
            setProjects(data?.data)
            } )
            .catch( (err)=>{
            const {response}=err
            const {data}=response
            const {message}=data
            toast.error(message)
            } )
        }
    },[workspace])
  return (
    <div className="mt-6">
        <div className="px-4 flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-500">PROJECTS</span>
        <button className="text-gray-500 hover:bg-gray-100 rounded w-5 h-5 flex items-center justify-center">+</button>
        </div>
        <div className="mt-1 px-1">
        {
            projects && projects.map(project=>{
            return (
                <Link to={`/p/${project?.id}`} key={project.id} >
                <div className="flex items-center px-3 py-1.5 mx-1 hover:bg-gray-100 rounded gap-2 cursor-pointer">
                    <div className="w-6 h-6 rounded bg-purple-600 text-white flex items-center justify-center text-xs font-semibold">M</div>
                    <span className="text-sm">{project.name}</span>
                </div>
                </Link>
            )
            })
        }
        </div>
    </div>
  )
}

export default SidebarProject