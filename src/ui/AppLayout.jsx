import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';
import Header from './Header';
import { SideBarProvider } from '../context/SidebarMenuContext';

const StyledLayout = styled.div`
  display: flex;
`;
const StyledMain = styled.main`
  width: 100%;
  padding-left: 5rem;

  @media only screen and (max-width: 56.25em) {
    padding-left: 0;
  }
  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;
function AppLayout() {
  return (
    <SideBarProvider>
      <StyledLayout>
        <Sidebar />
        <StyledMain>
          <Header />
          <Outlet />
        </StyledMain>
      </StyledLayout>
    </SideBarProvider>
  );
}

export default AppLayout;
