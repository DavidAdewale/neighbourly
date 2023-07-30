import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';
import Header from './Header';

const StyledLayout = styled.div`
  display: flex;
`;
const StyledMain = styled.main`
  width: 98%;
`;
function AppLayout() {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledMain>
        <Header />
        <Outlet />
      </StyledMain>
    </StyledLayout>
  );
}

export default AppLayout;
