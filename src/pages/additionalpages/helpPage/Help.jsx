import { styled } from 'styled-components';
import Paragraph from '../../../ui/Paragraph';
import { useDarkMode } from '../../../context/DarkModeContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media only screen and (max-width: 56.25em) {
    padding: 2rem 3rem;
  }

  @media only screen and (max-width: 37.5em) {
    height: 100vh;
    justify-content: center;
  }
`;

const TitleContainer = styled.div`
  /* flex-basis: 0 1 800px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 1rem;
  width: 50%;

  & img {
    width: 15%;
  }

  @media only screen and (max-width: 56.25em) {
    width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Image = styled.div`
  width: 40%;
  /* overflow: hidden; */
  & img {
    width: 100%;
    border-radius: 2rem;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    transition: all cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
  }

  &:hover > img {
    transform: scale(1.03);
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  }

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;

function Help() {
  const { isDark } = useDarkMode();

  const src = isDark ? 'emblemGrad-dark.png' : 'emblemGrad-light.png';
  const srcImg = isDark ? 'help-home-dark.jpg' : 'help-home.jpg';
  return (
    <Container>
      <TitleContainer>
        <Title>
          <img src={src} alt="emblem" />
          <h3>Getting started</h3>
        </Title>
        <Paragraph>Learn how to get up and running with Neighbourly</Paragraph>
      </TitleContainer>
      <Image>
        <img src={srcImg} />
      </Image>
    </Container>
  );
}

export default Help;
