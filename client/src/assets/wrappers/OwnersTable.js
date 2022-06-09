import styled from 'styled-components'

const Wrapper = styled.article`
  /* background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2); */
  width: 100%;
  height: max-content;
  margin: 0 0.25rem;
  /* padding: 1rem; */

  header {
    display: flex;
    justify-content: space-between;

    button {
      font-size: 1.5rem;
    }
  }
`

export default Wrapper