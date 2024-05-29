import React from 'react'

const Button = ({title}:{
  title:String,
}) => {
  return (
   <button className={`hover:bg-gray-300 p-1 rounded-sm`}>
    {title}
   </button>
  )
}

export default Button
