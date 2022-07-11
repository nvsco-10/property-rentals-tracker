import { useState } from 'react'
import { useAppContext } from '../context/appContext'

// Styles
import Wrapper from '../assets/wrappers/Navbar'

// Icons/Images
import Logo from './Logo.js'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'

const Navbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext()
  const [ showDropdown, setShowDropdown ] = useState(false)

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft/>
        </button>
        <div>
          <Logo/>
          <h5 className='logo-text'>Dashboard</h5>
        </div>
        <div className='btn-container'>
          <button 
            type='button' 
            className='btn settings-btn' 
            onClick={() => setShowDropdown(!showDropdown)} 
          >
            <FaUserCircle />
              {user && user.username}
            <FaCaretDown />
          </button>
          <div className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}>
            <button 
              type='button' 
              className='dropdown-btn' 
              onClick={logoutUser} 
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar