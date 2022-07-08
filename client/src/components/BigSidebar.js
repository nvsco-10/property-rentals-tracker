import { useAppContext } from '../context/appContext'
import DarkLogo from './DarkLogo'
import NavLinks from './NavLinks.js'

// Styles 
import Wrapper from '../assets/wrappers/BigSidebar'

const BigSidebar = () => {
  const { showSidebar } = useAppContext()

  return (
    <Wrapper>
      <div className={ showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <DarkLogo/>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar