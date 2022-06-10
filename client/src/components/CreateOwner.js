import React from 'react'
import { useAppContext } from '../context/appContext'
import { FormRow, Alert } from './index.js'
import Wrapper from '../assets/wrappers/Modal'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const CreateOwner = ({ open, setOpen }) => {
  const { handleChange, showAlert, displayAlert, isEditing, ownerName, createOwner, editOwner, clearValues } = useAppContext()

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

    if(!ownerName) {
      displayAlert()
      return
    }

    if(isEditing) {
      editOwner()
      return
    }

    createOwner()
  }

  // modal box style from MUI
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: 380, 
      sm: 450,
      md: 450, 
      lg: 450, 
      xl: 450, 
    },
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

            <h5>{isEditing ? 'Edit Owner' : 'Add Owner'}</h5> 

            {showAlert && <Alert />}
            <div className='form-container'>
              <FormRow
                type='text'
                labelText='owner name'
                name='ownerName'
                value={ownerName}
                handleChange={handleInput}
                maxLength={50}
              />
            </div>
          
            <div className='btn-container'>
              <button 
                className='btn submit-btn' 
                onClick={handleSubmit}
                disabled={ownerName?.length > 50 ? true : false}
              >
                Submit
              </button>
              <button className='btn cancel-btn' onClick={handleClose}>Cancel</button>
            </div>
          </Wrapper>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateOwner