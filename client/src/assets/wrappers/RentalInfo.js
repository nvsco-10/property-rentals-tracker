import styled from 'styled-components'

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  flex-basis: 50%;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  
    img {
      flex-basis: 40%;
      max-height: 150px;
    }

    .details {
      flex-basis: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;

      .title {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        span {
          font-size: 0.75rem;
          text-transform: lowercase;
          cursor: pointer;
          padding: 0 0.75em;
        }
      }

      h5 {
        margin-top: 0.5rem;
      }

      .content {
        display: flex;
        margin: 1rem 0;
      }
    }
  
  @media (min-width: 688px) {
    flex-direction: row
  }

`

export default Wrapper