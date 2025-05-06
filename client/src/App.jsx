import React, { use, useEffect } from 'react'
import Dashboard from './Pages/Dashboard'
import Sidebar from './Components/Sidebar'
import MyTasks from './Pages/MyTasks'
import WorkspaceSettings from './Pages/WorkspaceSettings'
import WorkspaceMembers from './Pages/WorkspaceMembers'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import Project from './Pages/Project'
import TaskDetails from './Pages/TaskDetails'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import ProtectedRoute from "./Components/ProtectedRoute"
import { ToastContainer,Flip } from 'react-toastify'

function App() {

  return (
    (<div className="flex min-h-screen bg-gray-50">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={ <ProtectedRoute> <Sidebar /> </ProtectedRoute> } >
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/mytasks'} element={<MyTasks />} />
          <Route path={'/settings'} element={<WorkspaceSettings />} />
          <Route path={'/members'} element={<WorkspaceMembers />} />
          <Route path={"/p/:project_id"} element={<Project />} />
          <Route path={"/t"} element={<TaskDetails />} />
        </Route>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>

      <ToastContainer
      className="z-50"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>)
  )
}

export default App