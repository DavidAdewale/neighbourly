import { styled } from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      {label && <label htmlFor={children.type.id}>{label}</label>}
      {children}
    </StyledFormRow>
  );
}

export default FormRow;
