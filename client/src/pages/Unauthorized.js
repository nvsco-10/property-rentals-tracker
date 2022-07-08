import { Error } from '../components'
import img from '../assets/images/warning.svg'

// Styles
import Wrapper from '../assets/wrappers/ErrorPage'

const Unauthorized = () => {
  return (
    <Wrapper className='full-page'>
      <Error 
        img={img}
        type='unauthorized'
        heading='Unauthorized Access!'
        message={`Sorry you can't view this page`}
      />
    </Wrapper>
  )
}

export default Unauthorized