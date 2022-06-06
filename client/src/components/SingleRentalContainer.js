import { useEffect } from 'react'
import Wrapper from '../assets/wrappers/SingleRentalContainer'
import RentalInfo from './RentalInfo'
import RentalActions from './RentalActions'
import ActionContainer from './ActionContainer'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'

import React from 'react'

const SingleRentalContainer = () => {
  const { getRentalById, isLoading, activeAction, rentalById } = useAppContext()

  if(isLoading) {
    return <Loading center/>
  }

  return (
    <Wrapper>
      <div className='rental-details'>
        <RentalInfo/>
        <RentalActions/>
      </div>
      <div className='action-details'>
        <ActionContainer/>
      </div>
      
    </Wrapper>
  )
}

export default SingleRentalContainer