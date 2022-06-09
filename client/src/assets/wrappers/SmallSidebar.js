import styled from 'styled-components'

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--primary-500);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--white);
    cursor: pointer;
  }
  header {
      display: flex;
      justify-content: center;
  }
  img {
      width: 50%;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .nav-link {
    display: flex;
    align-items: center;
    width: 100%;
    color: var(--white);
    padding: 1rem 0 1rem 1rem;
    text-transform: capitalize;
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }

  .nav-link.active {
      background-color: var(--grey-700)
  }

  .active {
    color: var(--white);
  }
  .active .icon {
    color: var(--white);
  }
`
export default Wrapper
