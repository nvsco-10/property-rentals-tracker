import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaHome, FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all rentals', path: 'all-rentals', icon: <FaHome /> },
  { id: 3, text: 'add rental', path: 'add-rental', icon: <FaWpforms /> },
  { id: 4, text: 'add owner', path: 'add-owner', icon: <FaWpforms /> }
]

export default links
