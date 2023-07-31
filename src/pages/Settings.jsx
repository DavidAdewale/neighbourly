import { styled } from 'styled-components';
import { useUser } from '../authentication/useUser';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import UpdatePersonalInformation from '../authentication/UpdatePersonalInformation';
import UpdatePassword from '../authentication/UpdatePassword';

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

const FormStyle = styled.div`
  display: flex;
  gap: 3rem;
  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
`;

function Settings() {
  useDocumentTitle('Settings');
  const { user } = useUser();
  const { avatar } = user.user_metadata;
  const userAvatar = avatar || 'default-user.jpg';
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
    </Page>
  );
}

export default Settings;
