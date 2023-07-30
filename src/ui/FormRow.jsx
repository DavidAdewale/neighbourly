import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import { styled } from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-danger);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <label htmlFor={children.type.id}>{label}</label>}
      {children}
      {error && (
        <Error>
          <HiOutlineExclamationCircle /> {error}
        </Error>
      )}
    </StyledFormRow>
  );
}

export default FormRow;
