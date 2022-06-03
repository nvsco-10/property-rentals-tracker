import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  div {
    margin-inline: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .status, .priority {
    border-radius: 8%;
    font-size: 0.85rem;
    padding: 0.20em 0.5em;
  }

  .status.open {
    background: blue;
    color: white;
  }

  .status.pending-lease {
    background: yellow;
    color: black;
  }

  .status.maintenance {
    background: lightcyan;
    color: black;
  }

  .status.closed {
    background: lightgray;
    color: black;
  }

  .priority.normal {
    background: green;
    color: white;
  }

  .priority.high {
    background: orange;
    color: black;
  }


`

export default Wrapper