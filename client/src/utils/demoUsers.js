import { FaUserTie, FaUser } from 'react-icons/fa'

const demoUsers = [
  {
    id: 'admin',
    username: 'demoAdmin',
    password: '123456',
    name: 'Admin',
    title: 'Never at the office',
    icon: <FaUserTie  className='icon'  />
  },
  {
    id: 'bob',
    username: 'demoBob',
    password: '123456',
    name: 'User Bob',
    title: 'Bob hates his job',
    icon: <FaUser className='icon' />
  },
  {
    id: 'jane',
    username: 'demoJane',
    password: '123456',
    name: 'User Jane',
    title: 'Jane hates Bob',
    icon: <FaUser className='icon' />
    
  },
  {
    id: 'alex',
    username: 'demoAlex',
    password: '123456',
    name: 'User Alex',
    title: 'Alex is suffering from Imposter Syndrome',
    icon: <FaUser className='icon' />
  }
]

export default demoUsers


