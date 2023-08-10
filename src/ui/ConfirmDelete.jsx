import { css, styled } from 'styled-components';
import Button from './Button';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-text);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StyledButton = styled.button`
  font: inherit;
  ${(props) =>
    props.variation === 'danger' &&
    css`
      background-color: var(--color-danger);
      color: var(--color-danger);
    `}
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <h4>Delete {resourceName}</h4>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone
      </p>
      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <StyledButton
          variation="danger"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </StyledButton>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
