import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';

// Components
import { OwnersTable, OwnersProperty } from '.'

// Styles
import Wrapper from '../assets/wrappers/OwnersContainer'

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