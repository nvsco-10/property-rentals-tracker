import { RiDashboardFill } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { ImUsers } from 'react-icons/im'

const links = [
  { id: 1, text: 'home', path: '/', icon: <RiDashboardFill /> },
  { id: 2, text: 'all rentals', path: 'all-rentals', icon: <FaHome /> },
  { id: 3, text: 'add rental', path: 'add-rental', icon: <IoMdAdd /> },
  { id: 4, text: 'all owners', path: 'all-owners', icon: <ImUsers /> },
]

export default links
