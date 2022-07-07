import { useAppContext } from '../context/appContext'
import { Info, StatusContainer, EditDeleteBtns, Note } from '.'

// Styles
import Wrapper from '../assets/wrappers/ActionContainer'

const ActionContainer = () => {
  const { activeAction, handleChange, note, createNote, setNote } = useAppContext()

  const handleNoteInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const handleNoteSubmit = (e) => {
    if(!note) {
      return
    }
    createNote()
  }

  const setActiveNote = (note) => {
    setNote(note)
  }

  return (
    <Wrapper>
      {!activeAction ? (
        <div>no selected action</div>
      ) : (
        <>
          <div className='details-container'>
            <header>
              <h5>Selected Action</h5>
              <EditDeleteBtns type='action'/>
            </header>
            <div className='body'>
              <div className='row spaced'>
                <Info heading='action' item={activeAction?.actionItem} />
                <StatusContainer status='open' priority='normal' />
              </div>
              <div className='row'>
                <Info heading='details' item={activeAction?.details || '-'}/>
              </div>
              <div className='row'>
                <Info heading='created by' item={activeAction?.createdBy || '-'}/>
                <Info heading='date added' item={activeAction?.createdAt || '-'}/>
              </div>
            </div>
          </div>
          <div className='notes-container'>
            <h6>Notes</h6>
              <div className='input-container'>
                <textarea
                  name='note'
                  value={note}
                  onChange={handleNoteInput}
                />
                <button className='btn addnote-btn' onClick={handleNoteSubmit} disabled={note.length < 401 ? false : true}>Add note</button>
                <p className={note.length < 401 ? '' : 'danger'}>
                  {note.length} / 400
                  <span className={note.length < 401 ? '' : 'active'}>
                    note length has been exceeded!
                  </span>
                </p>
              </div>
              <div className='body'>
                {activeAction?.notes?.length > 0 ? (activeAction.notes.map(note => {
                  return (
                    <Note 
                      key={note._id}
                      note={note}
                      setActiveNote={setActiveNote}
                    />
                  )
                })
              ) : (
                <div>
                  <p className='text-small'>No notes to display...</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
    </Wrapper>
  )
}

export default ActionContainer