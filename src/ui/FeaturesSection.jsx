import { styled } from 'styled-components';
import Features from './Features';

const Container = styled.div`
  padding: 10rem 10rem;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  z-index: -1;

  @media only screen and (max-width: 112.5em) {
    padding: 8rem 8rem;

    gap: 6rem;
  }

  @media only screen and (max-width: 56.25em) {
    padding: 4rem 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 4rem 2rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    width: 60%;
    height: 1px;
    background: var(--color-after-border);
    z-index: 0;
  }
`;

function FeaturesSection() {
  return (
    <Container>
      <h3>Discover the Neighbourly Advantage</h3>
      <Features />
    </Container>
  );
}

export default FeaturesSection;
