import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/EditDeleteBtns'
import { useAppContext } from '../context/appContext'
import { DeleteAlert, CreateAction, CreateOwner, EditNote } from '.'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const EditDeleteBtns = ({ type, id }) => {
  const { setEditAction, setEditNote, setEditOwner } = useAppContext()
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditAction, setOpenEditAction] = useState(false);
  const [openEditNote, setOpenEditNote] = useState(false)
  const [openEditOwner, setOpenEditOwner] = useState(false)

  const handleEdit = () => {
    if(type === 'action') {
      setEditAction()
      setOpenEditAction(true)
    }
    
    if(type === 'note') {
      setEditNote(id)
      setOpenEditNote(true)
    }

    if(type === 'owner') {
      setEditOwner(id)
      setOpenEditOwner(true)
    }
  }

  const handleDelete = () => {
      setOpenDelete(true)
  }

  return (
    <Wrapper>
      <button onClick={handleEdit}><AiFillEdit/></button>
      <button onClick={handleDelete}><AiFillDelete/></button>
      <DeleteAlert type={type} open={openDelete} setOpen={setOpenDelete} />
      <CreateAction open={openEditAction} setOpen={setOpenEditAction} />
      <EditNote open={openEditNote} setOpen={setOpenEditNote} />
      <CreateOwner open={openEditOwner} setOpen={setOpenEditOwner} />
    </Wrapper>
  )
}

export default EditDeleteBtns