import * as React from 'react';
import Wrapper from '../assets/wrappers/Modal'
import Box from '@mui/material/Box';
import { useAppContext } from '../context/appContext';
import { FormRow, FormRowSelectRole, Alert } from './index.js'
import Modal from '@mui/material/Modal';

export default function AddUser({ open, setOpen }) {
  const{ user, isEditing, displayAlert, handleChange, showAlert, clearValues, username, password, firstName, lastName, email, isAdmin, createUser, updateUser } = useAppContext()

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

    if( !username || !firstName || !lastName || !email ) {
      displayAlert()
      return
    }

    if(!isEditing && !password) {
      displayAlert()
      return
    }
   
    if(isEditing) {
      const currentUser = {
        username,
        firstName,
        lastName,
        email,
        isAdmin
      }

      updateUser(currentUser)
      return
    }

    const currentUser = {
      username,
      password,
      firstName,
      lastName,
      email,
      isAdmin
    }

    createUser(currentUser)
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
                value={username}
                handleChange={handleUserInput}
              />
              {!isEditing && 
              <FormRow
                type='password'
                labelText='password'
                name='password'
                value={password}
                handleChange={handleUserInput}
              />
              }
              <FormRow
                type='text'
                labelText='first name'
                name='firstName'
                value={firstName}
                handleChange={handleUserInput}
              />
              <FormRow
                type='text'
                labelText='last name'
                name='lastName'
                value={lastName}
                handleChange={handleUserInput}
              />
               <FormRow
                type='text'
                labelText='email'
                name='email'
                value={email}
                handleChange={handleUserInput}
              />
              <FormRowSelectRole
                labelText='role'
                name='isAdmin'
                value={isAdmin} 
                handleChange={handleUserInput}
                list={["admin", "user"]}
              />
            </div>
          
            <div className='btn-container'>
              <button className='btn submit-btn' onClick={handleSubmit} disabled={user.username === "demoAdmin" ? true : false}>Submit</button>
              <button className='btn cancel-btn' onClick={handleClose}>Cancel</button>
            </div>
          </Wrapper>
        </Box>
      </Modal>
    </div>
  );
}