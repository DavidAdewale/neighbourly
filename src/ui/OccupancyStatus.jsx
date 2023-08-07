import { css, styled } from 'styled-components';

const OccupancyStatus = styled.span`
  display: inline-block;
  /* background-color: var(--color-main); */
  color: var(--color-btn-text);
  padding: 0.2rem 2rem;
  border-radius: 5em;

  ${(props) =>
    props.type === 'occupied' &&
    css`
      background-color: var(--color-occupied);
    `}

  ${(props) =>
    props.type === 'partially-occupied' &&
    css`
      background-color: var(--color-partially-occupied);
    `}

    ${(props) =>
    props.type === 'vacant' &&
    css`
      background-color: var(--color-btn-text-faded);
    `}
`;

export default OccupancyStatus;
