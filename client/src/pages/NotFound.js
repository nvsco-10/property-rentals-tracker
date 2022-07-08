import { Error } from '../components'
import img from '../assets/images/not-found.svg'

// Styles
import Wrapper from '../assets/wrappers/ErrorPage'

const NotFound = () => {
  return (
    <Wrapper className='full-page'>
      <Error 
        img={img}
        type='not found'
        heading='Oh no! Page Not Found'
        message={`We can't seem to find the page you're looking for`}
      />
    </Wrapper>
  )
}

export default NotFound