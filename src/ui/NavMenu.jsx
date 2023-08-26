import { styled } from 'styled-components';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { useMenuToggle } from '../hooks/useMenuToggle';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useDarkMode } from '../context/DarkModeContext';
import { useUser } from '../features/authentication/useUser';
import { useLogout } from '../features/authentication/useLogout';
import { StyledNavLink } from './StyledNavLink';
import { StyledNavMenu } from './StyledNavMenu';

const MenuListContainer = styled.div`
  display: flex;

  & button {
    background-color: transparent;
    border: none;
    z-index: 3;
  }

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    display: none;
    color: var(--color-text);
    @media only screen and (max-width: 37.5em) {
      display: block;
    }
  }
`;

const StyledOverlay = styled.div`
  display: none;
  @media only screen and (max-width: 37.5em) {
    display: block;
    position: absolute;
    background-color: var(--color-overlay);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
`;

function NavMenu() {
  const { isAuthenticated } = useUser();
  const { logout } = useLogout();

  const { isOpen, handleToggle, closeMenu } = useMenuToggle();
  const { isDark, handleDarkToggle } = useDarkMode();
  const ref = useOutsideClick(closeMenu);

  return (
    <MenuListContainer>
      <StyledNavMenu type={isOpen ? 'open' : ''} ref={ref}>
        <li>
          <StyledNavLink to="/help">How to use</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="https://github.com/DavidAdewale/neighbourly">
            Docs
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            onClick={() => {
              handleDarkToggle();
              closeMenu();
            }}
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </StyledNavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <StyledNavLink type="button" to="/dashboard">
              Dashboard
            </StyledNavLink>
          </li>
        ) : (
          <>
            <li>
              <StyledNavLink to="/signin">Sign in</StyledNavLink>
            </li>
            <li>
              <StyledNavLink type="button" to="/signup">
                Sign up
              </StyledNavLink>
            </li>
          </>
        )}
      </StyledNavMenu>
      <button onClick={handleToggle}>
        {isOpen ? <HiXMark /> : <HiBars3 />}
      </button>
      {isOpen && <StyledOverlay />}
    </MenuListContainer>
  );
}

export default NavMenu;
