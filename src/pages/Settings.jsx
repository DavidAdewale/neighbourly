import { styled } from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import UpdatePersonalInformation from '../features/settings/UpdatePersonalInformation';
import UpdatePassword from '../features/settings/UpdatePassword';
import DisplaySettings from '../features/settings/DisplaySettings';

const Page = styled.div`
  padding: 2rem 4rem;

  @media only screen and (max-width: 37.5em) {
    padding: 2rem 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;

  border-bottom: 1px solid var(--color-light-accent);
`;

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

const SettingsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
`;

function Settings() {
  useDocumentTitle('Settings');
  const { user } = useUser();
  const picture = user.user_metadata.picture;

  const { avatar } = user.user_metadata;
  const userAvatar = picture || avatar || 'default-user.jpg';
  return (
    <Page>
      <Header>
        <h3>Account Settings</h3>
        <ProfileImage>
          <img src={userAvatar} alt="profile image" />
        </ProfileImage>
      </Header>
      <SettingsRow>
        <h4>Personal Information</h4>
        <UpdatePersonalInformation />
      </SettingsRow>
      <SettingsRow>
        <h4>Change Password</h4>
        <UpdatePassword />
      </SettingsRow>
      <SettingsRow>
        <h4>Display settings</h4>
        <DisplaySettings />
      </SettingsRow>
    </Page>
  );
}

export default Settings;
