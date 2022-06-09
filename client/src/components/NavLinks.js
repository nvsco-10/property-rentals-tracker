import links from '../utils/links'
import { IoBarChartSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const NavLinks = ({toggleSidebar}) => {
  const { user } = useAppContext()
  const { isAdmin } = user

  const usersLink = { 
    id: 1, 
    text: 'manage users', 
    path: '/manage-users', 
    icon: <IoBarChartSharp /> 
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