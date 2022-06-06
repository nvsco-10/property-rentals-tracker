import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ActionContainer'
import Info from './Info'
import StatusContainer from './StatusContainer'
import EditDeleteBtns from './EditDeleteBtns'
import Loading from './Loading'
import moment from 'moment'

const ActionContainer = () => {
  const { rentalById, activeAction, isLoading, handleChange, note, createNote } = useAppContext()

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const handleSubmit = (e) => {
    createNote()
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
              onChange={handleInput}
            />
            <button onClick={handleSubmit}>Add note</button>
          </div>
          <div className='body'>
            {activeAction?.notes?.length > 0 ? (activeAction.notes.map(note => {
              return (
              <div key={note._id} className='note-container'>
                <div className='row'>
                  <p className='note'>{note.note}</p>
                  <EditDeleteBtns />
                </div>
                <div className='row'>
                  <p className='details'>Added by: {note.createdBy.username}</p>
                  <p className='details'>{moment(note.createdAt).format('MMM Do, YYYY')}</p>
                </div>
            </div>
            )
            })
          ) : (
            <div>No notes to display...</div>
          )}
        </div>
      </div>
      </>
      )}
      
    </Wrapper>
  )
}

export default ActionContainer