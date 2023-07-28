import { styled } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledImageContainer = styled.div`
  width: 20%;

  @media only screen and (max-width: 37.5em) {
    width: 60%;
  }
  img {
    width: 80%;
  }
`;

function Logo() {
  const { isDark } = useDarkMode();

  const imageSrc = isDark ? 'neighbourly-dark.svg' : 'neighbourly-light.svg';
  return (
    <StyledImageContainer>
      <img src={imageSrc} alt="Neighbourhood Logo" draggable="false" />
    </StyledImageContainer>
  );
}

export default Logo;
