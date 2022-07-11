import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

// Icons/Utils
import links from '../utils/links'
import { HiUserGroup } from 'react-icons/hi'

const NavLinks = ({toggleSidebar}) => {
  const { user } = useAppContext()
  const { isAdmin } = user

  // manage users link for admins
  const usersLink = { 
    id: 1, 
    text: 'manage users', 
    path: '/manage-users', 
    icon: <HiUserGroup /> 
  }

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { id, text, path, icon } = link
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}

      { isAdmin && (
          <NavLink
          to={usersLink.path}
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
          onClick={toggleSidebar}
        >
          <span className='icon'>{usersLink.icon}</span>
          {usersLink.text}
        </NavLink>
      )}
    </div>
  )
}

export default NavLinks