import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 2rem;

  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  .rental-details {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    gap: 1rem;
  }

  .action-details {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    gap: 1rem;
  }

  .info-container { 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-inline: 1rem;

    p {
      font-size: 0.90rem;
    }
  }

  @media (min-width: 1420px) {
    .rental-details, .action-details {
    flex-direction: row;
    max-width: 100%;
    }
  }

  /* @media (min-width: 992px) {
    .rental-details {
    flex-direction: row;
    }
  } */

`

export default Wrapper