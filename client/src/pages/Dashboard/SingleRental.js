import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { SingleRentalContainer } from '../../components'

const SingleRental = () => {
  const { id } = useParams()
  const { getRentalById, activeRental, } = useAppContext()

  useEffect(() => {
    getRentalById(id)
  }, [])

  return (
    <>
      {activeRental && (
        <SingleRentalContainer />
      )}
    </>
  )
}

export default SingleRental