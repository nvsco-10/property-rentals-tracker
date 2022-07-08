import { useAppContext } from '../context/appContext'

// Components
import { FormRow,  Alert } from './index.js'

// Material UI components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// Styles
import style from '../utils/modalStyle'
import Wrapper from '../assets/wrappers/Modal'

const EditNote = ({ open, setOpen }) => {
  const { handleChange, showAlert, editedNote, editNote, clearValues } = useAppContext()

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