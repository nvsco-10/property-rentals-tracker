import React from 'react'
import Tooltip from '@mui/material/Tooltip';

const DemoButton = ({ id, title, name, handleClick, icon }) => {
  return (
    <Tooltip title={title} placement="top">
      <button id={id} className='account' onClick={handleClick} >
        {icon}
        Demo {name}
      </button>
    </Tooltip>
  )
}

export default DemoButton