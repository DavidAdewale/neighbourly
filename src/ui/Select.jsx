import { styled } from 'styled-components';

const Select = styled.select`
  padding: 1rem 1.8rem;
  font-family: inherit;
  border: none;
  border-radius: 0.8rem;

  background-color: var(--color-form-btn);
  color: var(--color-text);

  transition: all 0.3s;

  &:focus {
    /* padding: 1rem 2rem; */
    outline: 1.5px solid var(--color-light-accent);
    background-color: var(--color-input-focus);
    color: var(--color-text);
  }

  & option {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
`;

export default Select;
