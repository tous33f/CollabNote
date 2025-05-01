import React from 'react'

function Stats() {
  return (
    <div>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Total Projects</span>
              <span className="text-xs font-semibold text-green-500">2</span>
            </div>
            <div className="text-2xl font-semibold">2</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Total Tasks</span>
              <span className="text-xs font-semibold text-green-500">14</span>
            </div>
            <div className="text-2xl font-semibold">14</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Assigned Tasks</span>
              <span className="text-xs font-semibold text-green-500">7</span>
            </div>
            <div className="text-2xl font-semibold">7</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Completed Tasks</span>
              <span className="text-xs font-semibold text-green-500">2</span>
            </div>
            <div className="text-2xl font-semibold">2</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Overdue Tasks</span>
              <span className="text-xs font-semibold text-red-500">0</span>
            </div>
            <div className="text-2xl font-semibold">0</div>
          </div>
        </div>
    </div>
  )
}

export default Stats