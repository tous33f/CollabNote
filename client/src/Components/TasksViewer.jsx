

import { useState, useRef, useEffect } from "react"
import Table from "./Table"
import Kanban from "./Kanban"
import CreateTask from "./CreateTask"

export default function TasksViewer() {
  const [activeTab, setActiveTab] = useState("Table")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openTaskMenu, setOpenTaskMenu] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null)
  const taskMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
      if (taskMenuRef.current && !taskMenuRef.current.contains(event.target)) {
        setOpenTaskMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter options
  const statusOptions = ["All", "Backlog", "Todo", "In Progress", "In Review", "Done"]
  const assigneeOptions = ["All", "John", "Antonio"]
  const projectOptions = ["All", "Mobile App Development", "Website Redesign"]
  const dueDateOptions = ["All", "Today", "This Week", "This Month", "Overdue"]

  // Task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Optimize images",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 5th, 2024",
      status: "Backlog",
    },
    {
      id: 2,
      name: "Integrate push notifications",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "J", name: "John" },
      dueDate: "October 13th, 2024",
      status: "Backlog",
    },
    {
      id: 3,
      name: "Conduct usability testing",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "J", name: "John" },
      dueDate: "October 15th, 2024",
      status: "Backlog",
    },
    {
      id: 4,
      name: "Implement responsive layout",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 4th, 2024",
      status: "Todo",
    },
    {
      id: 5,
      name: "Integrate CMS",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 6th, 2024",
      status: "Todo",
    },
    {
      id: 6,
      name: "Implement navigation flow",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "J", name: "John" },
      dueDate: "October 11th, 2024",
      status: "Todo",
    },
    {
      id: 7,
      name: "Implement offline mode",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 14th, 2024",
      status: "Todo",
    },
    {
      id: 8,
      name: "Design new homepage",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 3rd, 2024",
      status: "In Progress",
    },
    {
      id: 9,
      name: "Implement user authentication",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "J", name: "John" },
      dueDate: "October 7th, 2024",
      status: "In Progress",
    },
    {
      id: 10,
      name: "Design UI components",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 10th, 2024",
      status: "In Progress",
    },
    {
      id: 11,
      name: "Write content for main pages",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 8th, 2024",
      status: "In Review",
    },
    {
      id: 12,
      name: "Develop login screen",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 12th, 2024",
      status: "In Review",
    },
    {
      id: 13,
      name: "Create sitemap",
      project: { code: "W", name: "Website Redesign" },
      assignee: { initial: "A", name: "Antonio" },
      dueDate: "October 2nd, 2024",
      status: "Done",
    },
    {
      id: 14,
      name: "Create app wireframes",
      project: { code: "M", name: "Mobile App Development" },
      assignee: { initial: "J", name: "John" },
      dueDate: "October 9th, 2024",
      status: "Done",
    },
  ])

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Backlog":
        return "bg-pink-500 text-white"
      case "Todo":
        return "bg-red-500 text-white"
      case "In Review":
        return "bg-blue-500 text-white"
      case "In Progress":
        return "bg-yellow-500 text-black"
      case "Done":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Handle filter dropdown toggle
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(dropdown)
    }
  }

  // Handle task menu toggle
  const toggleTaskMenu = (taskId) => {
    if (openTaskMenu === taskId) {
      setOpenTaskMenu(null)
    } else {
      setOpenTaskMenu(taskId)
    }
  }

  // Handle edit task
  const handleEditTask = (task) => {
    setIsOpen(task)
    // console.log(`Edit task ${task}`)
    setOpenTaskMenu(null)
  }

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    console.log(`Delete task ${taskId}`)
    setOpenTaskMenu(null)
  }

  return (
    <div className=" w-full" >

      {/* Task creation form  */}
      {isOpen && <CreateTask isOpen={isOpen} setIsOpen={setIsOpen} />}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex">
              {["Table", "Kanban"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button onClick={()=>setIsOpen(true)} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 text-sm mt-4" ref={dropdownRef}>
          {/* Status Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => toggleDropdown("status")}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18"
                />
              </svg>
              All statuses
              <svg
                className={`w-4 h-4 transition-transform ${openDropdown === "status" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "status" && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <ul className="py-1">
                  {statusOptions.map((option) => (
                    <li
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Assignee Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => toggleDropdown("assignee")}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              All assignees
              <svg
                className={`w-4 h-4 transition-transform ${openDropdown === "assignee" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "assignee" && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <ul className="py-1">
                  {assigneeOptions.map((option) => (
                    <li
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Project Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => toggleDropdown("project")}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              All projects
              <svg
                className={`w-4 h-4 transition-transform ${openDropdown === "project" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "project" && (
              <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200">
                <ul className="py-1">
                  {projectOptions.map((option) => (
                    <li
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Due Date Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => toggleDropdown("dueDate")}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Due date
              <svg
                className={`w-4 h-4 transition-transform ${openDropdown === "dueDate" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "dueDate" && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <ul className="py-1">
                  {dueDateOptions.map((option) => (
                    <li
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tasks Menu */}
        {activeTab=="Table" && 
            <Table
            tasks={tasks}
            toggleTaskMenu={toggleTaskMenu} 
            handleEditTask={handleEditTask} 
            handleDeleteTask={handleDeleteTask} 
            taskMenuRef={taskMenuRef}
            openTaskMenu={openTaskMenu}
            getStatusColor={getStatusColor}
            />
        }
        {activeTab=="Kanban" &&
            <Kanban tasks={tasks} setTasks={setTasks} />
        }
    </div>
  )
}
