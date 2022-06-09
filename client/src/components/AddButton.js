import { useState } from 'react'
import { GrFormAdd } from 'react-icons/gr'
import Wrapper from '../assets/wrappers/AddButton'
import { CreateAction, CreateOwner, AddUser } from '.'

const AddButton = ({ type }) => {
  const [openAction, setOpenAction] = useState(false)
  const [openOwner, setOpenOwner] = useState(false)
  const [openUser, setOpenUser] = useState(false)

  const handleClick = () => {
    if(type === 'action') {
      setOpenAction(true)
    }

    if(type === 'owner') {
      setOpenOwner(true)
    }

    if(type === 'user') {
      setOpenUser(true)
    }
  }

  
  return (
    <Wrapper>
      <GrFormAdd onClick={handleClick}/>
      <CreateAction open={openAction} setOpen={setOpenAction}/>
      <CreateOwner open={openOwner} setOpen={setOpenOwner}/>
      <AddUser open={openUser} setOpen={setOpenUser} />
    </Wrapper>
  )
}

export default AddButton