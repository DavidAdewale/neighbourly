import { styled } from 'styled-components';
import Logo from './Logo';
import NavMenu from './NavMenu';

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem 10rem;
  position: fixed;
  background: var(--color-btn-nav-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  @media only screen and (max-width: 56.25em) {
    padding: 2rem 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 2rem 2rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 60%;
    height: 1px;
    background: var(--color-after-border);
    z-index: 1;
  }
`;

function NavBar() {
  return (
    <StyledNavBar>
      <Logo />
      <NavMenu />
    </StyledNavBar>
  );
}

export default NavBar;
