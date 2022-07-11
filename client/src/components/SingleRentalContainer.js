import { useAppContext } from '../context/appContext'

// Components
import { RentalInfo, RentalActions, ActionContainer, Loading } from '.'

// Styles
import Wrapper from '../assets/wrappers/SingleRentalContainer'

const SingleRentalContainer = () => {
  const { isLoading} = useAppContext()

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