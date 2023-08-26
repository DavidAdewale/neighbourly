import { NavLink, useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import { useDarkMode } from '../../../../context/DarkModeContext';

import { useSideBarMenu } from '../../../../context/SidebarMenuContext';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import {
  HiOutlineBuildingLibrary,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlinePlay,
  HiOutlineSquares2X2,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

const StyledAside = styled.aside`
  min-height: 100vh;
  max-width: 30rem;
  background-color: var(--color-bg);
  border-right: 1px solid var(--color-light-accent);
  padding: 2rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5rem;

  position: fixed;
  z-index: 1000;

  & img {
    width: 80%;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  /* @media only screen and (max-width: 56.25em) {
    position: static;
  } */

  @media only screen and (max-width: 56.25em) {
    position: fixed;
    background-color: var(--color-bg);
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    ${(props) =>
      props.type === 'hidden' &&
      css`
        left: -50rem;
      `}

    ${(props) =>
      props.type === 'shown' &&
      css`
        left: 0;
      `}
  }
`;

const StyledMenu = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & hr {
    opacity: 0.3;
  }
`;

const MenuList = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 2rem;
  text-decoration: none;
  padding: 1rem 4rem;

  font-size: 1.6rem;
  color: var(--color-text);
  position: relative;

  z-index: 0;

  & svg {
    width: 2.3rem;
    height: 2.3rem;
  }

  &:not(.active):hover {
    &::after {
      background-color: var(--color-form-input-focus);
      width: 100%;
      height: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    z-index: -1;

    transition: width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  &.active {
    background-color: var(--color-btn-secondary-hover);
  }
`;

function Menu() {
  const { isDark } = useDarkMode();
  const { isSidebarOpen, closeSidebar } = useSideBarMenu();
  const ref = useOutsideClick(closeSidebar);
  const navigate = useNavigate();

  const sidebarState = isSidebarOpen ? 'shown' : 'hidden';
  const imageSrc = isDark ? '/fullLogoDark.svg' : '/fullLogoLight.svg';

  return (
    <StyledAside type={sidebarState} ref={ref}>
      <img
        src={imageSrc}
        alt="Neighbourly logo"
        draggable="false"
        onClick={() => navigate('/')}
      />
      <StyledMenu>
        <MenuList to="/help" onClick={() => closeSidebar()}>
          <HiOutlineHome /> Home
        </MenuList>
        <MenuList to="/guide/getting-started" onClick={() => closeSidebar()}>
          <HiOutlinePlay /> Getting Started
        </MenuList>
        <hr />
        <MenuList to="/guide/dashboard-overview" onClick={() => closeSidebar()}>
          <HiOutlineSquares2X2 /> Dashboard
        </MenuList>
        <MenuList
          to="/guide/properties-overview"
          onClick={() => closeSidebar()}
        >
          <HiOutlineBuildingLibrary /> Properties
        </MenuList>
        <MenuList to="/guide/tenants-overview" onClick={() => closeSidebar()}>
          <HiOutlineUserCircle /> Tenants
        </MenuList>
        <MenuList to="/guide/finance-overview" onClick={() => closeSidebar()}>
          <HiOutlineChartBar /> Finances
        </MenuList>
        <MenuList to="/guide/settings-overview" onClick={() => closeSidebar()}>
          <HiOutlineCog6Tooth /> Settings
        </MenuList>
      </StyledMenu>
    </StyledAside>
  );
}

export default Menu;
