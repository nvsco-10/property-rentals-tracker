import React from 'react'
import { AssignedRentalsTable } from '.'
import { useAppContext } from '../context/appContext'

const AssignedRentalsContainer = () => {
  const { assignedRentals } = useAppContext()

  return (
    <div>
      <h5>My Assigned Rentals</h5>
      {assignedRentals.length ? 
        <AssignedRentalsTable /> 
        : <p>No assigned rentals to display..</p>
      }

    </div>
  )
}

export default AssignedRentalsContainer