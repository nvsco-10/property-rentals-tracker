import styled from 'styled-components'

const Wrapper = styled.div`

  h5 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .form-container {
    margin-top: 1rem;
  }

  .form-label, select, option {
    font-size: 0.875rem;
  }

  .warning {
    padding-left: 0.75rem;
    margin: 0.25rem 0 0; 
    font-size: 0.75rem;
  }

  .warning.danger {
    color: red;
  }

  span {
    visibility: hidden;
    margin: 0 0.5rem;
  }

  span.active {
    visibility: visible;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;

      button {
      height: 35px;
    }

    .submit-btn {
      background: var(--primary-500);
      margin-right: 1rem;
    }

    .delete-btn {
      background: darkred;
      margin-right: 1rem;
    }

    .cancel-btn {
      background: var(--grey-500);
    }
  }

  

`
export default Wrapper
