import styled from 'styled-components'

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  flex-basis: 100%;
  padding: 1rem;
  margin: 2rem 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .details-container, .notes-container {
    flex-basis: 50%;

    display: flex;
    flex-direction: column;
    padding: 0 0.5em;
  }

  .details-container {
    border-bottom: 1px solid var(--grey-100);
    padding-bottom: 1rem;

    header {
      display: flex;
      justify-content: space-between;
    }

    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .row {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .row.spaced {
      justify-content: space-between;
      }
      
    }
    
  }

  .notes-container {

    h6 {
      font-size: 0.9rem;
      margin-bottom: 0.5em;
    }

    .input-container {
      display: flex;
      flex-direction:column;

      textarea {
        width: 100%;
        resize: vertical;
        line-height: inherit;
        font-size: inherit;
        padding: 0.5em;
      }

      .addnote-btn {
        background: #112658;
        color: white;
        font-size: inherit;
        padding: 0.25em;
      }

      p {
        font-size: 0.75rem;
      }

      p.danger {
        color: red;
      }

      span {
        visibility: hidden;
        margin: 0 0.5rem;
      }

      span.active {
        visibility: visible;
      }
    }

    .body {
      overflow-y: scroll;
      margin: 1rem 0;

      .note-container {
      display: flex;
      flex-direction: column;
      margin: 0.5rem;
      padding: 0.5em;
      border-bottom: solid 1px lightgray;
      cursor: pointer;

      .row {
        display: flex;
        justify-content: space-between;

        .note {
          text-align: justify;
          padding: 0.5em;
        }

        .details {
          margin-top: 0.5rem;
          font-size: 0.8rem;
        }

      }

      .row.end {
        justify-content: flex-end;
      }

      .row.start {
        justify-content: flex-start;
      }
    }
    }

    
  }

  @media (min-width: 992px) {
    flex-direction: row;
    max-height: 400px;

    .details-container {
      border-right: 1px solid var(--grey-100);
    }

  }
`

export default Wrapper