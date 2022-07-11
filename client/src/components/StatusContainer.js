// Styles
import Wrapper from '../assets/wrappers/StatusContainer'

const StatusContainer = ({ status, priority }) => {
  return (
    <Wrapper>
      <div>
        <h6>STATUS</h6>
        <p className={`status ${status}`}>{status}</p>
      </div>
      <div>
        <h6>PRIORITY</h6>
        <p className={`priority ${priority}`}>{priority}</p>
      </div>
    </Wrapper>
  )
}

export default StatusContainer