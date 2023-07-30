import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledNavLinks = styled(NavLink)`
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
    color: var(--color-btn-text-faded);
  }

  &:hover,
  &.active {
    background-color: var(--color-btn-secondary-hover);

    & svg {
      color: var(--color-text);
    }
  }
`;

function SidebarLink({ link }) {
  const tooltipId = 'menulinks';

  const { icon, content, to } = link;

  return (
    <StyledNavLinks
      to={to}
      data-tooltip-id={tooltipId}
      data-tooltip-content={content}
      data-tooltip-place="right"
    >
      {icon}
    </StyledNavLinks>
  );
}

export default SidebarLink;
