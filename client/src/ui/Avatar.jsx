import React from 'react'

function Avatar({letter}) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">{letter.toUpperCase()}</div>  )
}

export default Avatar