import { css, styled } from 'styled-components';

export const StyledNavMenu = styled.ul`
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
