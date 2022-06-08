import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  } 

  button {
    height: 20px;
    font-size: 1rem;
    cursor: pointer;
  }

  .owner-column, .property-column {
    display: flex;
    justify-content: center;
    flex-basis: 100%;

  }

  .owner-column {
      margin-bottom: 2rem;
    }

  .property-column {
    margin-bottom: 1rem;
  }

  @media (min-width: 992px) {
    flex-direction: column;

    .owner-column, .property-column {
      width: 700px;
      margin: 0 auto;
    }

    .owner-column {
      margin-bottom: 2rem;
    }

    .property-column {
      margin-bottom: 1rem;
    }

  }

  @media (min-width: 1420px) {
    flex-direction: row;

    .owner-column, .property-column {
      flex-basis: 50%;
    }
  
  }

`

export default Wrapper