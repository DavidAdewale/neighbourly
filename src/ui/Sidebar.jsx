import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { styled } from 'styled-components';

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChartBarSquare,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';

import { useLogout } from '../authentication/useLogout';
import { useDarkMode } from '../context/DarkModeContext';

import SidebarLink from './SidebarLink';
import Spinner from './Spinner';

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
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-danger);
  }

  &:hover {
    background-color: var(--color-danger);

    & svg {
      color: var(--color-btn-text);
    }
  }
`;

function Sidebar() {
  const links = [
    { icon: <HiOutlineChartPie />, content: 'Dashboard', to: '/dashboard' },
    {
      icon: <HiOutlineHomeModern />,
      content: 'Properties',
      to: '/properties',
    },
    { icon: <HiOutlineUsers />, content: 'Tenants', to: '/tenants' },
    { icon: <HiOutlineChartBarSquare />, content: 'Reports', to: '/reports' },
    { icon: <HiOutlineCog6Tooth />, content: 'Settings', to: '/settings' },
  ];

  const { logout, isLoggingOut } = useLogout();
  const { isDark } = useDarkMode();

  const navigate = useNavigate();

  const imageSrc = isDark ? 'emblemGrad-dark.png' : 'emblemGrad-light.png';
  return (
    <StyledAside>
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
      <Tooltip id="menulinks" />
    </StyledAside>
  );
}

export default Sidebar;
