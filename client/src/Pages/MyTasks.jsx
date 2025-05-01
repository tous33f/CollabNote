import React from 'react'
import Header from '../Components/Header'
import TasksViewer from '../Components/TasksViewer'

function MyTasks() {
  return (
    <div className='w-full flex-1 p-6 flex flex-col gap-6' >
        <Header title="My Tasks" description="View all of your tasks here" />
        <TasksViewer />
    </div>
  )
}

export default MyTasks