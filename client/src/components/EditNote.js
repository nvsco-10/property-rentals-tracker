import React from 'react'
import { useAppContext } from '../context/appContext'
import { FormRow, FormRowSelect, Alert } from './index.js'
import Wrapper from '../assets/wrappers/Modal'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const EditNote = ({ open, setOpen }) => {
  const { handleChange, showAlert, displayAlert, activeNote, editedNote, editNote, clearValues } = useAppContext()

  const handleClose = () => {
    setOpen(false);
    clearValues()
  };

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    editNote()
  }

  // modal box style from MUI
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
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

            <h5>Edit Note</h5> 

            {showAlert && <Alert />}
            <div className='form-container'>
              <FormRow
                type='text'
                labelText='note'
                name='editedNote'
                value={editedNote}
                handleChange={handleInput}
              />
            </div>
          
            <div className='btn-container'>
              <button className='btn submit-btn' onClick={handleSubmit}>Submit</button>
              <button className='btn cancel-btn' onClick={handleClose}>Cancel</button>
            </div>
          </Wrapper>
        </Box>
      </Modal>
    </div>
  );
}

export default EditNote