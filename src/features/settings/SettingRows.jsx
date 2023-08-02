import { styled } from 'styled-components';
import DisplaySettings from './DisplaySettings';
import UpdatePassword from './UpdatePassword';
import UpdatePersonalInformation from './UpdatePersonalInformation';

const SettingsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 2rem;
  padding-bottom: 4rem;

  border-bottom: 1px solid var(--color-form-input-focus);
`;

function SettingRows() {
  return (
    <>
      <SettingsRow>
        <h4>Display settings</h4>
        <DisplaySettings />
      </SettingsRow>

      <SettingsRow>
        <h4>Personal Information</h4>
        <UpdatePersonalInformation />
      </SettingsRow>
      <SettingsRow>
        <h4>Change Password</h4>
        <UpdatePassword />
      </SettingsRow>
    </>
  );
}

export default SettingRows;
