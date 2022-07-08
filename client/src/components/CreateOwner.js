import { useAppContext } from '../context/appContext'

// Components
import { FormRow, Alert } from './index.js'

// Material UI components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// Styles
import Wrapper from '../assets/wrappers/Modal'
import style from '../utils/modalStyle'

const CreateOwner = ({ open, setOpen }) => {
  const { 
    handleChange, 
    showAlert, 
    displayAlert, 
    isEditing, 
    ownerName, 
    createOwner,
    editOwner, 
    clearValues 
  } = useAppContext()

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