import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Modal'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const DeleteAlert = ({ open, setOpen }) => {
  const { activeAction, deleteAction } = useAppContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    deleteAction(activeAction.id)
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
            <p>Are you sure you want to delete this action?</p>
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