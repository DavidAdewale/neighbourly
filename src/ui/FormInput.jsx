import { css, styled } from 'styled-components';

const FormInput = styled.input`
  font-family: inherit;
  height: 3.8rem;
  min-width: 20rem;
  padding: 1rem;
  border: 1px solid var(--color-light-accent);
  outline: none;
  background-color: var(--color-form-input);
  border-radius: var(--border-radius);
  color: var(--color-text);
  transition: all 0.3s;

  &:focus {
    background-color: var(--color-form-input-focus);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-light-accent);
  }
  ${(props) =>
    props.type === 'date' &&
    css`
      text-transform: uppercase;
      &::-webkit-calendar-picker-indicator {
        color: transparent;
      }
    `}
`;

export default FormInput;
