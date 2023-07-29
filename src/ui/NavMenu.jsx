import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { useMenuToggle } from '../hooks/useMenuToggle';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useDarkMode } from '../context/DarkModeContext';
import { useUser } from '../authentication/useUser';
import { useLogout } from '../authentication/useLogout';

const StyledNavMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  transition: all 0.3s;

  @media only screen and (max-width: 37.5em) {
    background-color: var(--color-bg);
    width: 25rem;
    height: 100dvh;
    flex-direction: column;
    gap: 4rem;
    padding: 8rem 2rem;
    position: absolute;
    top: 0;
    right: -25rem;
    z-index: 2;

    ${(props) =>
      props.type === 'open' &&
      css`
        right: 0;
      `}
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-text);
  border-radius: 0.8rem;
  font-size: inherit;
  padding: 0.5rem 1.5rem;
  transition: all 0.15s;

  &:hover {
    background-color: var(--color-btn-secondary-hover);
  }

  ${(props) =>
    props.type === 'button' &&
    css`
      background-color: var(--color-main);
      color: var(--color-btn-text);

      border-radius: 0.8rem;

      &:hover {
        background-color: var(--color-main-hover);
        color: var(--color-btn-text);
      }
    `}
`;

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
  const { logout, isLoggingOut } = useLogout();

  const { isOpen, handleToggle, closeMenu } = useMenuToggle();
  const { isDark, handleDarkToggle } = useDarkMode();
  const ref = useOutsideClick(closeMenu);

  return (
    <MenuListContainer>
      <StyledNavMenu type={isOpen ? 'open' : ''} ref={ref}>
        <li>
          <StyledNavLink>How to use</StyledNavLink>
        </li>
        <li>
          <StyledNavLink>Docs</StyledNavLink>
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
            <StyledNavLink type="button" onClick={() => logout()}>
              Dashboard
            </StyledNavLink>
          </li>
        ) : (
          <>
            <li>
              <StyledNavLink to="/signin">Sign in</StyledNavLink>
            </li>
            <li>
              <StyledNavLink type="button">Sign up</StyledNavLink>
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
