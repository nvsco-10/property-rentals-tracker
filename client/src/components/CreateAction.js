import * as React from 'react';
import { useAppContext } from '../context/appContext';

// Components
import { FormRow, FormRowSelect, Alert } from './index.js'

// Material UI components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// Styles
import Wrapper from '../assets/wrappers/Modal'
import style from '../utils/modalStyle'

export default function ActionContainer({ open, setOpen }) {
  const { 
    isEditing, 
    actionItem, 
    details, 
    actionStatus, 
    actionStatusOptions, 
    actionPriority, 
    actionPriorityOptions, 
    handleChange, 
    createAction, 
    editAction, 
    activeRental, 
    showAlert, 
    activeAction, 
    displayAlert, 
    clearValues 
  } = useAppContext()

  const { _id } = activeRental

  const handleClose = () => {
    setOpen(false);
    clearValues()
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
                maxLength={100}
              />
              <FormRow
                type='text'
                labelText='details (optional)'
                name='details'
                value={details}
                handleChange={handleActionInput}
                maxLength={400}
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
              <button 
                className='btn submit-btn' 
                onClick={handleSubmit} 
                disabled={actionItem?.length > 100 || details?.length > 400 ? true : false}
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