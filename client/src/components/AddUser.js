import * as React from 'react';
import Wrapper from '../assets/wrappers/Modal'
import Box from '@mui/material/Box';
import { useAppContext } from '../context/appContext';
import { FormRow, FormRowSelect, Alert } from './index.js'
import Modal from '@mui/material/Modal';

export default function AddUser({ open, setOpen }) {
  const{ isEditing, displayAlert, handleChange, showAlert, clearValues } = useAppContext()

  const handleClose = () => {
    setOpen(false);
    clearValues()
  };

  const handleUserInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // if(!username  || !email || !firstName || !lastName) {
    //   displayAlert()
    //   return
    // }

    if(isEditing) {
      console.log('edit')
      return
    }

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

            {isEditing ? 
              <h5>Edit User</h5> :
              <h5>Add New User</h5>
            }
            
            {showAlert && <Alert />}
            <div className='form-container'>
              <FormRow
                type='text'
                labelText='username'
                name='username'
                // value={actionItem}
                handleChange={handleUserInput}
              />
              <FormRow
                type='password'
                labelText='password'
                name='password'
                // value={actionItem}
                handleChange={handleUserInput}
              />
              <FormRow
                type='text'
                labelText='first name'
                name='firstName'
                // value={details}
                handleChange={handleUserInput}
              />
              <FormRow
                type='text'
                labelText='last name'
                name='lastName'
                // value={details}
                handleChange={handleUserInput}
              />
               <FormRow
                type='text'
                labelText='email'
                name='email'
                // value={details}
                handleChange={handleUserInput}
              />
              <FormRowSelect
                labelText='Admin'
                name='isAdmin'
                // value={actionStatus} 
                handleChange={handleUserInput}
                list={["true", "false"]}
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