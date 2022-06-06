import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/EditDeleteBtns'
import { useAppContext } from '../context/appContext'
import DeleteAlert from './DeleteAlert'
import CreateAction from './CreateAction'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const EditDeleteBtns = ({  }) => {
  const { setEditAction } = useAppContext()
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEdit = () => {
    setEditAction()
    setOpenEditModal(true)
  }

  return (
    <Wrapper>
      <button onClick={handleEdit}><AiFillEdit/></button>
      <button onClick={() => setOpen(true)}><AiFillDelete/></button>
      <DeleteAlert open={open} setOpen={setOpen} />
      <CreateAction open={openEditModal} setOpen={setOpenEditModal} />
    </Wrapper>
  )
}

export default EditDeleteBtns