import { useState } from 'react'
import { GrFormAdd } from 'react-icons/gr'
import Wrapper from '../assets/wrappers/AddButton'
import ActionContainer from './CreateAction'

const AddButton = ({ type }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if(type === 'action') {
      setOpen(true)

    }
  }

  const renderModal = () => {
    switch(type) {
      case 'action':
        return <ActionContainer open={open} setOpen={setOpen}/>
        break;
    }
  }
  
  return (
    <Wrapper>
      <GrFormAdd onClick={handleClick}/>
      {renderModal()}
    </Wrapper>
  )
}

export default AddButton