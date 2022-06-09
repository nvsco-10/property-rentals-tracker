import React from 'react'
import Wrapper from '../assets/wrappers/UsersContainer'
import { UsersTable, AddButton } from '.'

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