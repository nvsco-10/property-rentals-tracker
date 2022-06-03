import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { Loading, SingleRentalContainer } from '../../components'

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
      <SingleRentalContainer />
      </>
    )}
    </>
  )
}

export default SingleRental