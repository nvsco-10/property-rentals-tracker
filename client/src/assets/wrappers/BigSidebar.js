import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--primary-500);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1rem;
    }
    img {
      width: 70%;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--white);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
    }
    .nav-link:hover {
      background: var(--grey-100);
      color: var(--grey-900);
    }
    .nav-link:hover .icon {
      color: var(--primary-500);
    }
    .icon {
      font-size: 1.25rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }

    .nav-link.active {
      background-color: var(--grey-100)
    }

    .active {
      color: var(--primary-500);
    }
    .active .icon {
      color: var(--primary-500);
    }
  }
`
export default Wrapper
