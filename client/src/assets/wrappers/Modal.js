import styled from 'styled-components'

const Wrapper = styled.div`

  h5 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .form-container {
    margin-top: 1rem;
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
