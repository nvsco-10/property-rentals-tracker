import React from 'react'
import { UsersContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import { Navigate } from 'react-router-dom'

const ManageUsers = () => {
  const { user } = useAppContext()

  if(user._id !== process.env.REACT_APP_DEMOADMIN) {
    return <Navigate to="/unauthorized" />
  }

  return (
    <>
      <UsersContainer/>
    </>
  )
}

export default ManageUsers