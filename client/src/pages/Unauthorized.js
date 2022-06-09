import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Unauthorized = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>YOU ARE NOT AUTHORIZED TO ACCESS THIS PAGE</h3>
        <p>text</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  )
}

export default Unauthorized