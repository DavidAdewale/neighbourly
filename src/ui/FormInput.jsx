import { styled } from 'styled-components';

const FormInput = styled.input`
  font-family: inherit;
  height: 3.8rem;
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
`;

export default FormInput;
