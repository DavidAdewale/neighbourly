import { css, styled } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import Button from './Button';

const StyledDiv = styled.div`
  min-height: 30rem;
  padding: 10rem 0;
  color: var(--color-btn-text);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  text-align: center;

  @media only screen and (max-width: 112.5em) {
    min-height: 20rem;
    padding: 8rem 0;
  }

  @media only screen and (max-width: 37.5em) {
    gap: 1.3rem;
  }

  ${(props) =>
    props.theme === 'light' &&
    css`
      background: url('/bgGradient-light.jpg');
      background-position: center;
      background-size: cover;
      background-blend-mode: screen;
    `}

  ${(props) =>
    props.theme === 'dark' &&
    css`
      background: url('/bgGradient-dark.jpg');
      background-position: center;
      background-size: cover;
      background-blend-mode: darken;
    `}
`;

function CTASection() {
  const { isDark } = useDarkMode();
  return (
    <StyledDiv theme={isDark ? 'dark' : 'light'}>
      <h3>Experience the Future of Property Management</h3>
      <Button>Join Neighbourly today!</Button>
    </StyledDiv>
  );
}

export default CTASection;
