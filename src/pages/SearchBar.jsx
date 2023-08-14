import { styled } from 'styled-components';

export const SearchBar = styled.div`
  display: flex;
  position: relative;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    top: 26%;
    left: 1rem;
    color: var(--color-btn-text-faded);
  }

  & input {
    padding: 1rem 3rem;
    font-family: inherit;
    border-radius: 0.8rem;
    border: 1px solid transparent;
    outline: none;

    background-color: var(--color-form-btn);
    color: var(--color-text);

    transition: all 0.3s;

    &::placeholder {
      color: var(--color-btn-text-faded);
    }

    &:focus {
      padding: 1rem 3.5rem;
      background-color: var(--color-input-focus);
      border: 1px solid var(--color-btn-secondary-hover);
    }
  }
`;
