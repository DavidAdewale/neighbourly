import { styled } from 'styled-components';

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 4rem;

  @media only screen and (max-width: 56.25rem) {
    padding: 2rem 2rem;
  }
`;
