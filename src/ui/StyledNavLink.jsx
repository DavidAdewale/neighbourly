import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';

export const StyledNavLink = styled(NavLink)`
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
