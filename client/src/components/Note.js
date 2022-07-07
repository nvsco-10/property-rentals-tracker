import EditDeleteBtns from "./EditDeleteBtns"

// Date formatting
import moment from 'moment'

const Note = ({ note, setActiveNote }) => {
  const { _id, note: noteText, createdBy, createdAt } = note

  return (
    <div onClick={() => setActiveNote(note)} className='note-container'>
      <div className='row end'>
        <EditDeleteBtns type='note' id={_id} />
      </div>
      <div className='row start'>
        <p className='note'>{noteText}</p>
      </div>
      <div className='row'>
        <p className='details'>Added by: {createdBy.username}</p>
        <p className='details'>{moment(createdAt).format('YYYY-MM-DD, HH:mm:ss')}</p>
      </div>
    </div>
  )
}

export default Note