import { styled } from 'styled-components';
import { HiBars3, HiOutlineMoon, HiOutlineSun, HiXMark } from 'react-icons/hi2';

import { useDarkMode } from '../../../../context/DarkModeContext';
import { useUser } from '../../../../features/authentication/useUser';
import { useSideBarMenu } from '../../../../context/SidebarMenuContext';
import Button from '../../../../ui/Button';
import { useNavigate } from 'react-router-dom';
import FullPageSpinner from '../../../../ui/FullPageSpinner';

const StyledHeader = styled.header`
  min-height: 4rem;
  border-bottom: 1px solid var(--color-light-accent);
  padding: 1.5rem 2rem;
  background: var(--color-hero-bg);
  background-position: center left;
  background-size: cover;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;

  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 900;

  @media only screen and (max-width: 37.5em) {
    justify-content: space-between;
  }
`;

const Icon = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-text);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  & svg {
    width: 2.1rem;
    height: 2.1rem;
    color: var(--color-btn-text-faded);
    transition: all 0.3s;
  }

  &:hover {
    & svg {
      color: var(--color-text);
    }
  }
`;

const ProfileImage = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  object-fit: cover;
`;

const LeftIconDiv = styled.div`
  display: none;
  @media only screen and (max-width: 56.25em) {
    display: block;
  }
`;

const RightIconDiv = styled.div`
  display: flex;
  gap: 2rem;
`;

function Header() {
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useSideBarMenu();
  const { isDark, handleDarkToggle } = useDarkMode();
  const { user, isAuthenticated, isLoading } = useUser();

  if (isLoading) return <FullPageSpinner />;

  const picture = user?.user_metadata.picture;
  const userAvatar =
    picture || user?.user_metadata.avatar || 'default-user.jpg';

  return (
    <StyledHeader>
      <LeftIconDiv>
        <Icon onClick={toggleSidebar}>
          {isSidebarOpen ? <HiXMark /> : <HiBars3 />}
        </Icon>
      </LeftIconDiv>
      <RightIconDiv>
        <Button variation="secondary" onClick={() => navigate('/')}>
          Home
        </Button>
        {isAuthenticated && (
          <>
            <Button
              variation="formSecondary"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Button onClick={() => navigate('/signin')}>Sign in/up</Button>
          </>
        )}
        <Icon onClick={handleDarkToggle}>
          {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Icon>
        {isAuthenticated && <ProfileImage src={userAvatar} />}
      </RightIconDiv>
    </StyledHeader>
  );
}

export default Header;
