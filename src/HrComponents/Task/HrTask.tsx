import React from 'react'
import { useNavigate } from 'react-router-dom'
import GetTasksHR from './TaskFunctions/GetTasksHR'

export default function HrTask() {
  const navigate=useNavigate()
  return (
    <>
    <div>HrTask</div>
    <GetTasksHR/>
    <button onClick={()=>{navigate('/hr/createTask')}}>+</button>

    </>
  )
}
