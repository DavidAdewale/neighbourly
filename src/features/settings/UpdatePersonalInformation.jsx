import { styled } from 'styled-components';
import { useState } from 'react';

import { useUser } from '../authentication/useUser';
import { useUpdateUser } from './useUpdateUser';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormBox from '../../ui/FormBox';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';

const FormStyle = styled.div`
  display: flex;
  gap: 3rem;
  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

function UpdatePersonalInformation() {
  const { user } = useUser();
  const { full_name: currentName, email } = user.user_metadata;

  const { updatedUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentName);
  const [avatar, setAvatar] = useState(null);

  // const formChange = fullName !== currentName || avatar;

  function handleSumbit(e) {
    e.preventDefault();
    if (!fullName || (fullName === currentName && !avatar)) return;
    console.log(fullName, avatar);
    updatedUser({ fullName, avatar });
  }

  function handleReset() {
    setFullName(currentName);
    setAvatar(null);
  }

  return (
    <FormBox onSubmit={handleSumbit}>
      <FormStyle>
        <FormRow label="Full Name">
          <FormInput
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormRow>
        <FormRow label="Email address">
          <FormInput type="email" id="email" value={email} disabled={true} />
        </FormRow>
        <FormRow label="Update Avatar">
          <FileInput
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </FormRow>
      </FormStyle>
      <ButtonContainer>
        <Button
        // disabled={isUpdating || !formChange || (!formChange && !avatar)}
        >
          {isUpdating ? <Spinner /> : ''} Save Changes
        </Button>
        <Button type="reset" disabled={isUpdating} onClick={handleReset}>
          Cancel
        </Button>
        {/* {formChange && (
          <Button type="reset" disabled={isUpdating} onClick={handleReset}>
            Cancel
          </Button>
        )} */}
      </ButtonContainer>
    </FormBox>
  );
}

export default UpdatePersonalInformation;
