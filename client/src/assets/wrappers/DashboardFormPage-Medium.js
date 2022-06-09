import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  /* max-width: 500px; */
  margin: 0 auto;
  background: var(--white);
  padding: 2rem 1rem 3rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .addrental-header {
    display: flex;
    justify-content: space-between;

    span {
      font-size: inherit;
    }

    .delete-btn {
      height: 40px;
      background: darkred;
    }
  }

  .form-row {
    margin-bottom: 0.75rem;
  }
  .form-label, select, option {
    font-size: 0.875rem;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    /* align-self: flex-end; */
    margin-top: 0.75rem;
    button {
      height: 35px;
    }
  }
  
  .btn-block {
    margin-top: 0.5rem;
    width: 100%;
  }
  .clear-btn {
    background: var(--grey-500);
  }
  
  @media (min-width: 992px) {
    padding: 3rem 2rem 4rem;

    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }

  }
  @media (min-width: 1120px) {
    width: 900px;

    .form-center {
      grid-template-columns: 1fr 1fr;
    }

  }
`

export default Wrapper
