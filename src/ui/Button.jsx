import { css, styled } from 'styled-components';

const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 0.5rem 1.5rem;
  border-radius: 0.8rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: var(--color-main);
      color: var(--color-btn-text);

      &:hover {
        background-color: var(--color-main-hover);
        color: var(--color-btn-text);
      }
    `}

  ${(props) =>
    props.type === 'secondary' &&
    css`
      background-color: var(--color-btn-secondary);
      color: var(--color-text);

      &:hover {
        background-color: var(--color-btn-secondary-hover);
        color: var(--color-text);
      }
    `}

    ${(props) =>
    props.type === 'danger' &&
    css`
      background-color: var(--color-danger);
      color: var(--color-btn-text);

      &:hover {
        background-color: var(--color-danger-hover);
        color: var(--color-btn-text);
      }
    `}

    ${(props) =>
    props.type === 'submit' &&
    css`
      background-color: var(--color-main);
      color: var(--color-btn-text);
      font-family: inherit;
      padding: 1rem 0.5rem;

      &:disabled {
        cursor: not-allowed;
        background-color: var(--color-light-accent);
      }

      &:hover:not(:disabled) {
        background-color: var(--color-main-hover);
        color: var(--color-btn-text);
      }
    `}

    ${(props) =>
    props.type === 'reset' &&
    css`
      background-color: var(--color-main);
      color: var(--color-btn-text);
      font-family: inherit;
      padding: 1rem 0.5rem;

      &:disabled {
        cursor: not-allowed;
        background-color: var(--color-light-accent);
      }

      &:hover:not(:disabled) {
        background-color: var(--color-main-hover);
        color: var(--color-btn-text);
      }
    `}

    ${(props) =>
    props.type === 'formSecondary' &&
    css`
      background-color: var(--color-form-btn);
      color: var(--color-text);
      padding: 1rem 0.5rem;
      border: 1px solid var(--color-light-accent);

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      &:hover {
        background-color: var(--color-btn-secondary-hover);
      }
    `}
`;

Button.defaultProps = {
  type: 'primary',
};

export default Button;
