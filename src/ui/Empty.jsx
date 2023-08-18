import { styled } from 'styled-components';

export const Empty = styled.div`
  padding: 15rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  color: var(--color-danger);

  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
