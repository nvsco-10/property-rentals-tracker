// Components
import { UsersTable, AddButton } from '.'

// Styles
import Wrapper from '../assets/wrappers/UsersContainer'

const UsersContainer = () => {
  return (
    <Wrapper>
      <header>
        <h5>Users</h5>
        <AddButton type='user'/>
      </header>
      <UsersTable/>
    </Wrapper>
  )
}

export default UsersContainer