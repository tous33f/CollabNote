import React from 'react'

function TasksCard() {
  return (
    <div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Assigned Tasks (14)</h2>
              <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded">+</button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 border border-gray-100 rounded">
                <div>
                  <h3 className="text-sm font-medium mb-1">Conduct usability testing</h3>
                  <div className="text-xs text-gray-500">Mobile App Development</div>
                </div>
                <div className="text-xs text-gray-500">14 days</div>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-100 rounded">
                <div>
                  <h3 className="text-sm font-medium mb-1">Implement offline mode</h3>
                  <div className="text-xs text-gray-500">Mobile App Development</div>
                </div>
                <div className="text-xs text-gray-500">13 days</div>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-100 rounded">
                <div>
                  <h3 className="text-sm font-medium mb-1">Integrate push notifications</h3>
                  <div className="text-xs text-gray-500">Mobile App Development</div>
                </div>
                <div className="text-xs text-gray-500">12 days</div>
              </div>
              <button className="w-full py-2 mt-2 bg-gray-100 text-sm text-gray-600 rounded hover:bg-gray-200">
                Show All
              </button>
            </div>
          </div>
    </div>
  )
}

export default TasksCard