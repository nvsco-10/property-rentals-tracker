import * as React from 'react';
import Wrapper from '../assets/wrappers/Modal'
import { useAppContext } from '../context/appContext';
import { FormRow, FormRowSelect, Alert } from './index.js'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';


export default function ActionContainer({ open, setOpen }) {
  const{ actionItem, details, actionStatus, actionStatusOptions, actionPriority, actionPriorityOptions, handleChange, createAction, rentalById, showAlert, displayAlert } = useAppContext()

  const { _id } = rentalById

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
    }

    createAction(_id)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth='xs' maxWidth='xs'>
        <Wrapper>
          <h5>Add New Action</h5>
          <Alert />
          <div>
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
        
          <DialogActions>
            <button className='btn submit-btn' onClick={handleSubmit}>Submit</button>
            <button className='btn cancel-btn' onClick={handleClose}>Cancel</button>
          </DialogActions>
        </Wrapper>
      </Dialog>
    </div>
  );
}