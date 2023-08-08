import { styled } from 'styled-components';

export const ColumnFormRow2 = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  border: none;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }

  & legend {
    color: var(--color-light-accent);
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;

    margin-bottom: 1rem;
  }
`;
