import { styled } from 'styled-components';
import HeroContent from './HeroContent';

const StyledBackground = styled.main`
  height: 100vh;
  background: var(--color-hero-bg);
  background-blend-mode: overlay;
  background-size: cover;
  background-position: top center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function HeroSection() {
  return (
    <StyledBackground>
      <HeroContent />
    </StyledBackground>
  );
}

export default HeroSection;
