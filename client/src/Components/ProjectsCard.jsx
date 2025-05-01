import React from 'react'

function ProjectsCard() {
  return (
    <div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Projects (2)</h2>
              <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded">+</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="w-8 h-8 rounded bg-purple-600 text-white flex items-center justify-center font-semibold">M</div>
                <span className="text-sm text-center">Mobile App Development</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="w-8 h-8 rounded bg-indigo-900 text-white flex items-center justify-center font-semibold">W</div>
                <span className="text-sm text-center">Website Redesign</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectsCard