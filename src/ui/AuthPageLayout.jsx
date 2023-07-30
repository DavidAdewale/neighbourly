import { styled } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const Page = styled.main`
  background: var(--color-hero-bg);
  background-position: top center;
  background-size: cover;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 4rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  & img {
    width: 20%;
  }
`;

function AuthPageLayout({ children }) {
  const { isDark } = useDarkMode();

  const imageSrc = isDark ? 'emblemGrad-dark.png' : 'emblemGrad-light.png';

  return (
    <Page>
      <Container>
        <img src={imageSrc} alt="Neighbourly Logo" draggable="false" />
        {children}
      </Container>
    </Page>
  );
}

export default AuthPageLayout;
