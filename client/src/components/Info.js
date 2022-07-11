const Info = ({ heading, item }) => {
  return (
    <div className='info-container'>
      <h6>{heading.toUpperCase()}</h6>
      <p className='info'>{item}</p>
    </div>
  )
}

export default Info