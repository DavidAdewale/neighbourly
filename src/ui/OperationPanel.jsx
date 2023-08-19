import { styled } from 'styled-components';

export const OperationPanel = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem 0;

  @media only screen and (max-width: 75em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;
