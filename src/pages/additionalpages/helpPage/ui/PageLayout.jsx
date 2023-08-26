import { styled } from 'styled-components';
import Header from './Header';
import Menu from './Menu';
import { SideBarProvider } from '../../../../context/SidebarMenuContext';
import { Outlet } from 'react-router-dom';

const StyledLayout = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  height: 100%;
  padding-left: 30rem;
  padding-top: 8rem;

  @media only screen and (max-width: 56.25em) {
    padding-left: 0rem;
  }
`;

function PageLayout() {
  return (
    <SideBarProvider>
      <StyledLayout>
        <Menu />
        <MainContent>
          <Header />
          <Outlet />
        </MainContent>
      </StyledLayout>
    </SideBarProvider>
  );
}

export default PageLayout;
