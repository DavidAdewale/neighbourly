import { styled } from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import SettingRows from '../features/settings/SettingRows';
import AppPageTitle from '../ui/AppPageTitle';
import AppPage from '../ui/AppPage';

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
    @media only screen and (max-width: 37.5em) {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
    }
  }
`;

function Settings() {
  useDocumentTitle('Settings');
  const { user } = useUser();
  const picture = user.user_metadata.picture;

  const { avatar } = user.user_metadata;
  const userAvatar = picture || avatar || 'default-user.jpg';
  return (
    <AppPage>
      <AppPageTitle>
        <h3>App Settings</h3>
        <ProfileImage>
          <img src={userAvatar} alt="profile image" />
        </ProfileImage>
      </AppPageTitle>
      <SettingRows />
    </AppPage>
  );
}

export default Settings;
