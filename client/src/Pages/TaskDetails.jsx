import React from 'react'
import Header from '../Components/Header'
import Avatar from '../ui/Avatar'
import { Pencil,X,Check } from 'lucide-react'
import { useState } from 'react'

function TaskDetails() {

    const [description, setDescription] = useState("This is a task for Website Redesign");
    const [isEditing, setIsEditing] = useState(false);
    const [tempDescription, setTempDescription] = useState(description);

    const handleEdit = () => {
        setTempDescription(description);
        setIsEditing(true);
    };

    const handleSave = () => {
        setDescription(tempDescription);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

  return (
    <div className='w-full flex-1 p-6 flex flex-col gap-6' >
        <Header title={"My Tasks"} description={"View all of your tasks here"} />
        {/* Task /project info  */}
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2" >
            <div className="w-8 h-8 rounded bg-purple-600 text-white flex items-center justify-center text-lg font-semibold">M</div>
            <p className="text-lg text-blakc font-semibold">Project</p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-semibold px-3 py-1 rounded flex items-center gap-1" >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>            Delete Task
          </button>
        </div>

        {/* Task info  */}
        <div className='w-full flex justify-around gap-6' >
            
            <div className="w-1/2 bg-gray-100 p-6 rounded-lg ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <Pencil size={16} className="mr-1" />
                    <span className="text-sm">Edit</span>
                    </button>
                </div>

                <div className="space-y-3">
                    {/* Assignee */}
                    <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-500">Assignee</div>
                        <div className="flex items-center space-x-2">
                            <Avatar letter={"a"} />
                            <span className="text-sm text-gray-800">{"John smith"}</span>
                        </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-500">Due Date</div>
                        <div className="text-sm text-orange-500 font-medium">
                            {"12 March 2025"}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-500">Status</div>
                        <div className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                            {"In Progress"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Task description  */}
            <div className="w-1/2 bg-gray-100 p-6 rounded-lg ">
                <div className="px-5">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                    {!isEditing ? (
                    <button 
                        onClick={handleEdit}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <Pencil size={16} className="mr-1" />
                        <span className="text-sm">Edit</span>
                    </button>
                    ) : (
                    <div className="flex space-x-2">
                        <button 
                        onClick={handleCancel}
                        className="flex items-center text-gray-500 hover:text-gray-700"
                        >
                        <X size={16} className="mr-1" />
                        <span className="text-sm">Cancel</span>
                        </button>
                        <button 
                        onClick={handleSave}
                        className="flex items-center text-green-600 hover:text-green-700"
                        >
                        <Check size={16} className="mr-1" />
                        <span className="text-sm">Save</span>
                        </button>
                    </div>
                    )}
                </div>

                {isEditing ? (
                    <textarea
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-fit min-h-24"
                    placeholder="Enter task description..."
                    />
                ) : (
                    <p className="text-gray-700">{description}</p>
                )}
                </div>
            </div>

        </div>
    </div>
  )
}

export default TaskDetails