import { useState } from 'react'
import { GrFormAdd } from 'react-icons/gr'
import Wrapper from '../assets/wrappers/AddButton'
import ActionContainer from './CreateAction'

const AddButton = ({ create, id, type }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if(type === 'action') {
      setOpen(true)

    }
  }
  
  return (
    <Wrapper>
      <GrFormAdd onClick={handleClick}/>
      <ActionContainer open={open} setOpen={setOpen} create id />
    </Wrapper>
  )
}

export default AddButton