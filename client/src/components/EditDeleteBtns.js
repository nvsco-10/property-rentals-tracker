import React from 'react'
import Wrapper from '../assets/wrappers/EditDeleteBtns'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const EditDeleteBtns = ({ handleEdit, handleDelete }) => {
  return (
    <Wrapper>
      <button><AiFillEdit/></button>
      <button><AiFillDelete/></button>
    </Wrapper>
  )
}

export default EditDeleteBtns