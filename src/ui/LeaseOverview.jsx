import { css, styled } from 'styled-components';
import Paragraph from './Paragraph';

export const OverviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 3rem;

  padding: 4rem 8rem;

  @media only screen and (max-width: 52.65em) {
    justify-content: space-around;
    flex-direction: column;
    padding: 4rem 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 4rem 2rem;
  }
`;

export const OverviewMeter = styled.div`
  /* min-width: 30rem; */
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  text-align: center;

  border: 1px dashed var(--color-btn-secondary-hover);
  background-color: var(--color-card-bg);
  border-radius: 0.5rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-btn-text-faded);
  }
`;
export const StyledOverviewParagraph = styled(Paragraph)`
  ${(props) =>
    props.size === 'small' &&
    css`
      text-transform: uppercase;
      color: var(--color-light-accent);
      letter-spacing: 0.2rem;
    `}
`;
