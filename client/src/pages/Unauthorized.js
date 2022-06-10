import { Link } from 'react-router-dom'
import img from '../assets/images/warning.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Unauthorized = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Unauthorized Access!</h3>
        <p>Sorry you can't view this page.</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  )
}

export default Unauthorized