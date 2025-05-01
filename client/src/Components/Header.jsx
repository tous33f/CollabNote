import React from 'react'

function Header({title,description}) {
  return (
    <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">A</div>
        </div>
    </div>
  )
}

export default Header