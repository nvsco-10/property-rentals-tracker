import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    padding-top: 2rem;
    padding-bottom: 2rem;
    /* border-top: 5px solid var(--primary-500); */
  }

  h5 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .toggle {
    color: blue;
    cursor: pointer;
  }

  .demo-login {
    display: grid;
    row-gap: 2rem;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;

    .account {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 1rem 0;

      font-size: 0.75rem;
      background: none;
      border: none;


      .icon {
        font-size: 2rem;
        padding-bottom: 0.20rem;
      }

    }

    .account:hover {
      background-color: var(--grey-100)
    }

  }

 

`
export default Wrapper
