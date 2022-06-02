import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { Loading } from '../../components'

const SingleRental = () => {
  const { id } = useParams()
  const { getRentalById, rentalById, isLoading } = useAppContext()

  useEffect(() => {
    getRentalById(id)
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
    {rentalById && (
      <>
      <p>{rentalById.streetAddress}</p>
      <p>{rentalById.city}</p>
      </>
    )}
    </>
  )
}

export default SingleRental