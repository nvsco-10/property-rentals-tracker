import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Modal'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Alert } from '.'

const DeleteAlert = ({ open, setOpen, type }) => {
  const { activeRental, activeAction, activeNote, deleteRental, deleteAction, deleteNote, deleteOwner, deleteUser, showAlert, activeUser } = useAppContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(type === 'rental') {
      deleteRental()
    }

    if(type === 'action') {
      deleteAction(activeAction.id)
    }

    if(type === 'note') {
      deleteNote()
    }

    if(type === 'owner') {
      deleteOwner()
    }

    if(type === 'user') {
      deleteUser()
    }

  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
  };

  return (
    <div>
      <Modal 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='box'>

          <Wrapper>
            { showAlert && <Alert/>}
            {type === 'user' ? 
              <p>{`Are you sure you want to delete user: ${activeUser.username}?`}</p> :
              <p>{`Are you sure you want to delete this ${type}?`}</p>
            }
            <p>Click 'Delete' to proceed.</p>
            <div className='btn-container'>
              <button className='btn delete-btn' onClick={handleSubmit}>Delete</button>
              <button className='btn cancel-btn' onClick={handleClose}>Cancel</button>
            </div>
          </Wrapper>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteAlert