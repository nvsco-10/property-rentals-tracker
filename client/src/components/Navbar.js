import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo.js'

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
          <h3 className='logo-text'>Dashboard</h3>
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
              className='dropdown-btn first' 
            >
              <Link to='profile' className='dropdown-btn'>
              profile
              </Link>
            </button>
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