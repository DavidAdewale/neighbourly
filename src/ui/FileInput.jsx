import { styled } from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  font-family: inherit;
  max-width: 22rem;
  font-size: inherit;
  transition: all 0.3s;

  &::file-selector-button {
    font: inherit;
    padding: 0.2rem 1.5rem;
    margin-right: 1.5rem;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    color: var(--color-text);

    background-color: var(--color-btn-secondary-hover);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: var(--color-btn-text-faded);
      color: var(--color-btn-text);
    }
  }
`;

export default FileInput;
