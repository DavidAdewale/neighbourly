import { styled } from 'styled-components';

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & input {
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
  }
`;

function InputContainer({ type, placeholder, label }) {
  return (
    <StyledInputContainer>
      <label htmlFor={type}>{label}</label>
      <input type={type} id={type} required placeholder={placeholder} />
    </StyledInputContainer>
  );
}

export default InputContainer;
