import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/EditDeleteBtns'
import { useAppContext } from '../context/appContext'
import { DeleteAlert, CreateAction, CreateOwner, EditNote, AddUser } from '.'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const EditDeleteBtns = ({ type, id }) => {
  const { setEditAction, setEditNote, setEditOwner, setEditUser } = useAppContext()
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditAction, setOpenEditAction] = useState(false);
  const [openEditNote, setOpenEditNote] = useState(false)
  const [openEditOwner, setOpenEditOwner] = useState(false)
  const [openEditUser, setOpenEditUser] = useState(false)

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

    if(type === 'user') {
      setEditUser(id)
      setOpenEditUser(true)
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
      <AddUser open={openEditUser} setOpen={setOpenEditUser} />
    </Wrapper>
  )
}

export default EditDeleteBtns