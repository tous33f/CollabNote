
import { useState, useEffect } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import axios from "axios"
import { toast } from "react-toastify"

// Task Card Component
const TaskCard = ({ task, index, moveTask, status }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id,project_id:task?.project?.id, index, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={`bg-white rounded-md border border-gray-200 mb-2 p-3 shadow-sm ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-medium">{task?.title}</div>
        <button className="text-gray-400 hover:text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" />
            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" />
            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
            {task?.assignee?.name?task?.assignee?.name[0]:'N'}
          </div>
          <div className="text-xs text-yellow-500">{(new Date(task?.due_date)
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
          )}</div>
        </div>
        <div
          className={`w-5 h-5 rounded flex items-center justify-center text-white text-xs font-medium ${
            "bg-blue-600"
          }`}
        >
          {task?.project?.name?task?.project?.name[0]:'P'}
        </div>
      </div>
    </div>
  )
}

// Column Component
const Column = ({ status, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id,item.project_id, status)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Backlog":
        return "text-pink-500 border-pink-500"
      case "Todo":
        return "text-red-500 border-red-500"
      case "In Progress":
        return "text-yellow-500 border-yellow-500"
      case "In Review":
        return "text-blue-500 border-blue-500"
      case "Done":
        return "text-green-500 border-green-500"
      default:
        return "text-gray-500 border-gray-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Backlog":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case "Todo":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case "In Progress":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "In Review":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 12l3 3 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "Done":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 12l3 3 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div ref={drop} className={`flex-1 w-1/5 bg-gray-50 rounded-md p-3 ${isOver ? "bg-gray-100" : ""}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className={`mr-2 ${getStatusColor(status)}`}>{getStatusIcon(status)}</div>
          <h3 className="font-medium text-sm">{status}</h3>
          <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">{tasks.length}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} moveTask={moveTask} status={status} />
        ))}
      </div>
    </div>
  )
}

// Main Kanban Board Component
const Kanban = ({ tasks, setTasks }) => {
  const [columns, setColumns] = useState({
    Backlog: [],
    Todo: [],
    "In Progress": [],
    "In Review": [],
    Done: [],
  })

  // Organize tasks into columns
  useEffect(() => {
    const newColumns = {
      Backlog: [],
      Todo: [],
      "In Progress": [],
      "In Review": [],
      Done: [],
    }

    tasks.forEach((task) => {
      if (newColumns[task.status]) {
        newColumns[task.status].push(task)
      }
    })

    setColumns(newColumns)
  }, [tasks])

  // Move task between columns
  const moveTask = (id,project_id, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: newStatus }
      }
      return task
    })

    axios.patch("/api/t/edit",{
      id,project_id, status: newStatus
    },{withCredentials:true})
    .catch(()=>setTasks(tasks))

    setTasks(updatedTasks)

  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        {Object.keys(columns).map((status) => (
          <Column key={status} status={status} tasks={columns[status]} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  )
}

export default Kanban
