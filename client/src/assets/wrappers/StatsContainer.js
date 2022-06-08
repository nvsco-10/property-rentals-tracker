import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 1rem 0 3rem;
  display: grid;
  row-gap: 2rem;
  border-bottom: solid lightgray 1px; 
  padding-bottom: 3rem;
  @media (min-width: 375px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 580px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`
export default Wrapper
