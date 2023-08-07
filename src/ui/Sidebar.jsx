import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { css, styled } from 'styled-components';

import {
  HiOutlineArchiveBoxXMark,
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowUpOnSquare,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { BsPieChart } from 'react-icons/bs';
import { useLogout } from '../features/authentication/useLogout';
import { useDarkMode } from '../context/DarkModeContext';

import SidebarLink from './SidebarLink';
import Spinner from './Spinner';
import { useSideBarMenu } from '../context/SidebarMenuContext';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { deleteProperties, handleCreateProperties } from '../data/upload';
import { useUser } from '../features/authentication/useUser';

const StyledAside = styled.aside`
  min-height: 100vh;
  max-width: 6rem;
  border-right: 1px solid var(--color-light-accent);
  padding: 2rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.6rem;

  & img {
    width: 70%;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  @media only screen and (max-width: 37.5em) {
    position: fixed;
    background-color: var(--color-bg);
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    ${(props) =>
      props.type === 'hidden' &&
      css`
        left: -10rem;
      `}

    ${(props) =>
      props.type === 'shown' &&
      css`
        left: 0;
      `}
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 0.8rem 0.8rem;
  border-radius: 0.5rem;
  color: var(---color-btn-text-faded);
  transition: all 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 2.1rem;
    height: 2.1rem;
    color: var(--color-danger);
  }

  &:hover {
    background-color: var(--color-danger);

    & svg {
      color: var(--color-btn-text);
    }
  }
`;

const links = [
  { icon: <BsPieChart />, content: 'Dashboard', to: '/dashboard' },
  {
    icon: <HiOutlineHomeModern />,
    content: 'Properties',
    to: '/properties',
  },
  { icon: <HiOutlineUsers />, content: 'Tenants', to: '/tenants' },
  { icon: <HiOutlineChartBarSquare />, content: 'Reports', to: '/reports' },
  { icon: <HiOutlineCog6Tooth />, content: 'Settings', to: '/settings' },
];

function Sidebar() {
  const { isDark } = useDarkMode();
  const { isSidebarOpen, closeSidebar } = useSideBarMenu();
  const { logout, isLoggingOut } = useLogout();
  const { user } = useUser();
  const id = user.id;
  const ref = useOutsideClick(closeSidebar);
  const navigate = useNavigate();

  const sidebarState = isSidebarOpen ? 'shown' : 'hidden';
  const imageSrc = isDark ? 'emblemGrad-dark.png' : 'emblemGrad-light.png';

  return (
    <StyledAside type={sidebarState} ref={ref}>
      <img
        src={imageSrc}
        alt="Neighbourly logo"
        draggable="false"
        onClick={() => navigate('/')}
      />
      {links.map((link) => (
        <SidebarLink link={link} key={link.content} />
      ))}
      <StyledNavLink
        data-tooltip-id="menulinks"
        data-tooltip-content="Logout"
        data-tooltip-place="right"
        onClick={() => logout()}
      >
        {isLoggingOut ? (
          <Spinner type="button" />
        ) : (
          <HiOutlineArrowRightOnRectangle />
        )}
      </StyledNavLink>
      {/* <StyledNavLink onClick={() => handleCreateProperties(id)}>
        <HiOutlineArrowUpOnSquare />
      </StyledNavLink>
      <StyledNavLink onClick={() => deleteProperties()}>
        <HiOutlineArchiveBoxXMark />
      </StyledNavLink> */}
      <Tooltip
        id="menulinks"
        hidden={window.innerWidth <= 1200 ? true : false}
        style={{
          zIndex: 1200,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      />
    </StyledAside>
  );
}

export default Sidebar;
