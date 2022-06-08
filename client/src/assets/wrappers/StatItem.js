import styled from 'styled-components'

const Wrapper = styled.article`
  padding: 1rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 1.25rem;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 35px;
    height: 25px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1rem;
      color: ${(props) => props.color};
    }
  }
`

export default Wrapper
