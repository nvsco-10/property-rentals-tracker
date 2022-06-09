import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { AssignedRentalsContainer, StatsContainer } from '../../components'

const Home = () => {
  const { getAssignedRentals, getStats } = useAppContext()

  useEffect(() => {
    getAssignedRentals()
    getStats()
  }, [])

  return (
    <>
    <h5>XYZ Properties</h5>
    <StatsContainer />
    <AssignedRentalsContainer />
    </>
  )
}

export default Home