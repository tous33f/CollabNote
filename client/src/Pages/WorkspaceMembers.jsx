import React from 'react'
import { useState,useRef,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

function WorkspaceMembers() {

  let workspace=useSelector(state=>state.workspace?.workspace)
  let user=useSelector(state=>state.user?.user)

  const [openDropdownId, setOpenDropdownId] = useState(null)
  const dropdownRef = useRef(null)
  const [members, setMembers] = useState([])

  // Change member role
  const changeMemberRole = (memberId, newRole) => {
    if(!workspace){
      return
    }
    axios.patch(`/api/w/members/update/${workspace.id}`,{user_id:memberId,role: newRole},{withCredentials: true})
    .then( ({data})=>{
      setMembers(
        members.map((member) => {
          if (member.id === memberId) {
            return { ...member, role: newRole }
          }
          return member
        }),
      )
      toast.success("Role updated successfully")
      setOpenDropdownId(null)
    } )
    .catch( (err)=>{
      const {response}=err
      const {data}=response
      const {message}=data
      toast.error(message)
    } )
  }

  // Remove member
  const removeMember = (memberId) => {
    if(!workspace){
      return
    }
    axios.delete(`/api/w/members/remove/${workspace.id}`,{user_id:memberId},{withCredentials: true})
    .then( ({data})=>{
      setMembers(members.filter((member) => member.id !== memberId))
      toast.success("User removed successfully")
      setOpenDropdownId(null)
    } )
    .catch( (err)=>{
      const {response}=err
      const {data}=response
      const {message}=data
      toast.error(message)
    } )
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    if(workspace){
      axios.get(`/api/w/members/${workspace.id}`,{withCredentials: true})
      .then( ({data})=>{
        if(Array.isArray(data?.data)){
          setMembers(data?.data.filter(member=>{
            return member.id!=user.id
          }))
        }
      } )
      .catch( (err)=>{
        const {response}=err
        const {data}=response
        const {message}=data
        toast.error(message)
      } )
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
        <div className="bg-white w-full h-screen p-6 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
            <h2 className="text-2xl font-semibold">Workspace Members</h2>
            <p className='text-sm text-gray-500' >Manage your workspace members</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Joined</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                          {member?.name[0]}
                        </div>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{member.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          member.role === "Admin"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{ (new Date(member?.createdAt)
                    .toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                    ) }</td>
                    {/* <td className="py-3 px-4 text-right relative" ref={dropdownRef}> */}
                      <button
                        className="my-2 py-3 px-4 rounded-full hover:bg-gray-100"
                        onClick={() => setOpenDropdownId(prev=>{
                            if(prev){
                                return null
                            }
                            else{
                                return member.id
                            }
                        })}
                      >
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" />
                          <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" />
                          <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" />
                        </svg>
                      </button>
                      {openDropdownId === member.id && (
                        <div className="absolute right-0 z-50 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            {member.role !== "admin" && (
                              <button
                              onClick={()=>changeMemberRole(member.id, "admin")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Make Admin
                              </button>
                            )}
                            {member.role !== "member" && (
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => changeMemberRole(member.id, "member")}
                              >
                                Make Member
                              </button>
                            )}
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => removeMember(member.id)}
                            >
                              Remove Member
                            </button>
                          </div>
                        </div>
                      )}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default WorkspaceMembers