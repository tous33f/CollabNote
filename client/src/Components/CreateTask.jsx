import { useState } from 'react';
import { Calendar, ChevronDown, X, Check } from 'lucide-react';

export default function CreateTask({isOpen,setIsOpen}) {
    const task=(typeof Boolean==typeof isOpen)?null:isOpen
    console.log(task)
  const [taskName, setTaskName] = useState(task?.name ?? "");
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Dropdown states
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  
  const [selectedAssignee, setSelectedAssignee] = useState(task?.assignee?.name ?? '');
  const [selectedStatus, setSelectedStatus] = useState(task?.status ?? '');
  const [selectedProject, setSelectedProject] = useState(task?.project?.name ?? '');

  // Sample data
  const assignees = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'];
  const statuses = ['To Do', 'In Progress', 'In Review', 'Completed'];
  const projects = ['Marketing Campaign', 'Website Redesign', 'Mobile App', 'Product Launch'];

  const handleClose = () => {
    setIsOpen(false);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDateSelect = (day) => {
    const today = new Date();
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), day);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black/25 flex items-center justify-center p-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center px-6 py-4">
              <h2 className="text-xl font-bold">{task?.name?"Edit":"Create a new"} task</h2>
            </div>

            <div className="px-6">
              <div className="border-t border-b border-gray-200 py-6 space-y-5">
                <div className="space-y-2">
                  <label htmlFor="taskName" className="block text-gray-700 font-medium">Task Name</label>
                  <input
                    id="taskName"
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Due Date</label>
                  <div className="relative">
                    <div 
                      className="flex border border-gray-300 rounded-md cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <div className="flex-grow px-3 py-2 text-gray-500">
                        {selectedDate || 'Select date'}
                      </div>
                      <div className="px-3 py-2 text-gray-400">
                        <Calendar size={20} />
                      </div>
                    </div>
                    
                    {showCalendar && (
                      <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-full">
                        <div className="p-3 border-b border-gray-200">
                          <div className="font-medium text-center">{monthName}</div>
                        </div>
                        <div className="p-2">
                          <div className="grid grid-cols-7 gap-1 mb-1">
                            {weekdays.map(day => (
                              <div key={day} className="text-xs text-center text-gray-500 py-1">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {generateCalendarDays().map((day, index) => (
                              <div 
                                key={index}
                                className={`text-center py-1 text-sm rounded-md ${
                                  day ? 'cursor-pointer hover:bg-blue-100' : ''
                                } ${
                                  day === new Date().getDate() ? 'bg-blue-50 text-blue-600 font-medium' : ''
                                }`}
                                onClick={() => day && handleDateSelect(day)}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Assignee</label>
                  <div className="relative">
                    <div 
                      className="flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                      onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                    >
                      <span className={selectedAssignee ? 'text-gray-800' : 'text-gray-500'}>
                        {selectedAssignee || 'Select assignee'}
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    
                    {showAssigneeDropdown && (
                      <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-full">
                        {assignees.map(assignee => (
                          <div 
                            key={assignee} 
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                            onClick={() => {
                              setSelectedAssignee(assignee);
                              setShowAssigneeDropdown(false);
                            }}
                          >
                            <span>{assignee}</span>
                            {selectedAssignee === assignee && <Check size={16} className="text-blue-500" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Status</label>
                  <div className="relative">
                    <div 
                      className="flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    >
                      <span className={selectedStatus ? 'text-gray-800' : 'text-gray-500'}>
                        {selectedStatus || 'Select status'}
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    
                    {showStatusDropdown && (
                      <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-full">
                        {statuses.map(status => (
                          <div 
                            key={status} 
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                            onClick={() => {
                              setSelectedStatus(status);
                              setShowStatusDropdown(false);
                            }}
                          >
                            <span>{status}</span>
                            {selectedStatus === status && <Check size={16} className="text-blue-500" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Project</label>
                  <div className="relative">
                    <div 
                      className="flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                      onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                    >
                      <span className={selectedProject ? 'text-gray-800' : 'text-gray-500'}>
                        {selectedProject || 'Select project'}
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    
                    {showProjectDropdown && (
                      <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-full">
                        {projects.map(project => (
                          <div 
                            key={project} 
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowProjectDropdown(false);
                            }}
                          >
                            <span>{project}</span>
                            {selectedProject === project && <Check size={16} className="text-blue-500" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-end space-x-3">
              <button 
                onClick={handleClose}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              >
                {task?.name?"Edit":"Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}