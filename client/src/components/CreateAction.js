import * as React from 'react';
import Wrapper from '../assets/wrappers/Modal'
import Box from '@mui/material/Box';
import { useAppContext } from '../context/appContext';
import { FormRow, FormRowSelect, FormRowSelectUsers, Alert } from './index.js'
import Modal from '@mui/material/Modal';

export default function ActionContainer({ open, setOpen }) {
  const{ isEditing, actionItem, details, actionStatus, actionStatusOptions, actionPriority, actionPriorityOptions, handleChange, createAction, editAction, activeRental, showAlert, activeAction, displayAlert } = useAppContext()

  const { _id } = activeRental

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!actionItem) {
      displayAlert()
      return
    }

    if(isEditing) {
      editAction(activeAction.id)
      return
    }

    createAction(_id)
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
              <h5>Edit Action</h5> :
              <h5>Add New Action</h5>
            }
            
            {showAlert && <Alert />}
            <div className='form-container'>
              <FormRow
                type='text'
                labelText='action item'
                name='actionItem'
                value={actionItem}
                handleChange={handleActionInput}
              />
              <FormRow
                type='text'
                labelText='details (optional)'
                name='details'
                value={details}
                handleChange={handleActionInput}
              />
              <FormRowSelect
                labelText='status'
                name='actionStatus'
                value={actionStatus} 
                handleChange={handleActionInput}
                list={actionStatusOptions}
              />
              <FormRowSelect
                labelText='priority'
                name='actionPriority'
                value={actionPriority} 
                handleChange={handleActionInput}
                list={actionPriorityOptions}
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