import Wrapper from '../assets/wrappers/RentalInfo'
import StatusContainer from './StatusContainer'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import icon from '../assets/images/houseplaceholder.png'
import Info from './Info'

const RentalInfo = () => {
  const { activeRental, setEditRental } = useAppContext()
  const { streetAddress, city, zipCode, status, priority, owner, assigned } = activeRental
  
  return (
    <Wrapper>
        <img src={icon} alt='house icon' />
        <div className='details'>
          <div className='title'>
            <h5>{`${streetAddress}, ${city}, ${zipCode}`} 
              <Link 
                to='/add-rental'
                onClick={() => setEditRental()}>
                  <span><i>edit</i></span>
              </Link>
            </h5>
            <p className='heading'>owner: {owner?.name} </p>
          </div>
          <div className='content'>
            <StatusContainer status={status} priority={priority} />
            <Info heading='assigned' item={assigned?.username} />
          </div>
        </div>
    </Wrapper>
  )
}

export default RentalInfo