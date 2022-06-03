import Wrapper from '../assets/wrappers/SingleRentalContainer'
import RentalInfo from './RentalInfo'
import RentalActions from './RentalActions'
import { useAppContext } from '../context/appContext'

import React from 'react'

const SingleRentalContainer = () => {
  const { rentalById } = useAppContext()

  return (
    <Wrapper>
      <div className='rental-details'>
        <RentalInfo/>
        <RentalActions/>
      </div>
      <div className='action-details'>
        
      </div>
      
    </Wrapper>
  )
}

export default SingleRentalContainer