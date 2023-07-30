import { styled } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useUser } from '../authentication/useUser';

const StyledHeader = styled.header`
  min-height: 4rem;
  border-bottom: 1px solid var(--color-light-accent);
  padding: 1.5rem 2rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;
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
    width: 2.4rem;
    height: 2.4rem;
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
`;

function Header() {
  const { isDark, handleDarkToggle } = useDarkMode();
  const { user } = useUser();
  const userAvatar =
    user.user_metadata.avatar_url ||
    user.user_metadata.avatar ||
    'default-user.jpg';

  return (
    <StyledHeader>
      <Icon onClick={handleDarkToggle}>
        {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Icon>
      <ProfileImage src={userAvatar} />
    </StyledHeader>
  );
}

export default Header;
