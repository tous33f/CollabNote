import React from 'react'
import Dashboard from './Pages/Dashboard'
import Sidebar from './Components/Sidebar'
import MyTasks from './Pages/MyTasks'
import WorkspaceSettings from './Pages/WorkspaceSettings'
import WorkspaceMembers from './Pages/WorkspaceMembers'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import Project from './Pages/Project'
import TaskDetails from './Pages/TaskDetails'

function App() {

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Routes>
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/mytasks'} element={<MyTasks />} />
        <Route path={'/settings'} element={<WorkspaceSettings />} />
        <Route path={'/members'} element={<WorkspaceMembers />} />
        <Route path={"/p"} element={<Project />} />
        <Route path={"/t"} element={<TaskDetails />} />
      </Routes>
    </div>
  )
}

export default App