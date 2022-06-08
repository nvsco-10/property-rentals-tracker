import React from 'react'
import Wrapper from '../assets/wrappers/OwnersContainer'
import { OwnersTable, OwnersProperty } from '.'
import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';

const OwnersContainer = () => {
  const { getOwners } = useAppContext()

  useEffect(() => {
    getOwners()
  }, [])

  return (
    <Wrapper>
      <div className='owner-column'>
        <OwnersTable />
      </div>
      <div className='property-column'>
       <OwnersProperty/>
      </div>
    </Wrapper>
    
  )
}

export default OwnersContainer