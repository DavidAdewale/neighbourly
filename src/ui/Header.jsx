import { styled } from 'styled-components';
import {
  HiBars3,
  HiOutlineMoon,
  HiOutlineQuestionMarkCircle,
  HiOutlineSun,
} from 'react-icons/hi2';

import { useDarkMode } from '../context/DarkModeContext';
import { useUser } from '../features/authentication/useUser';
import { useSideBarMenu } from '../context/SidebarMenuContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

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
  @media only screen and (max-width: 37.5em) {
    display: block;
  }
`;

const RightIconDiv = styled.div`
  display: flex;
  gap: 2rem;
`;

function Header() {
  const navigate = useNavigate();
  const { openSidebar } = useSideBarMenu();
  const { isDark, handleDarkToggle } = useDarkMode();
  const { user } = useUser();

  const picture = user.user_metadata.picture;
  const userAvatar = picture || user.user_metadata.avatar || 'default-user.jpg';

  return (
    <StyledHeader>
      <LeftIconDiv>
        <Icon onClick={openSidebar}>
          <HiBars3 />
        </Icon>
      </LeftIconDiv>
      <RightIconDiv>
        <Button variation="formSecondary" onClick={() => navigate('/help')}>
          <HiOutlineQuestionMarkCircle /> Help
        </Button>
        <Icon onClick={handleDarkToggle}>
          {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Icon>
        <ProfileImage src={userAvatar} />
      </RightIconDiv>
    </StyledHeader>
  );
}

export default Header;
