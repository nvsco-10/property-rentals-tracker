import Wrapper from '../assets/wrappers/RentalInfo'
import StatusContainer from './StatusContainer'
import { useAppContext } from '../context/appContext'
import icon from '../assets/images/houseplaceholder.png'
import React from 'react'
import Info from './Info'

const RentalInfo = () => {
  const { rentalById } = useAppContext()
  const { streetAddress, city, zipCode, status, priority, owner, assigned } = rentalById
  
  return (
    <Wrapper>
        <img src={icon} alt='house icon' />
        <div className='details'>
          <div className='title'>
            <h5>{`${streetAddress}, ${city}, ${zipCode}`}</h5>
            <p className='heading'>owner: {assigned.username} </p>
          </div>
          <div className='content'>
            <StatusContainer status={status} priority={priority} />
            <Info heading='assigned' item={assigned.username} />
          </div>
        </div>
    </Wrapper>
  )
}

export default RentalInfo