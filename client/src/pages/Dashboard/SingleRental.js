import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { Loading, SingleRentalContainer } from '../../components'

const SingleRental = () => {
  const { id } = useParams()
  const { getRentalById, activeRental, isLoading } = useAppContext()
  const { _id } = activeRental

  useEffect(() => {
    getRentalById(id)

    // if (isLoading) {
    //   return <Loading center />
    // }
  }, [])

  return (
    <>
    {activeRental && (
      <>
      <SingleRentalContainer />
      </>
    )}
    </>
  )
}

export default SingleRental