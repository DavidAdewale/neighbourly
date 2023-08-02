import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';

import { useUser } from '../authentication/useUser';
import { useUpdateUser } from './useUpdateUser';

import FormBox from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Paragraph from '../../ui/Paragraph';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';

const FormStyle = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

function UpdatePassword() {
  const { user } = useUser();
  const provider = user.app_metadata.provider;
  const isGoogle = provider === 'google';

  const { updatedUser, isUpdating } = useUpdateUser();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ password }) {
    updatedUser({ password });
  }
  return (
    <>
      {isGoogle ? (
        <Paragraph size="small">
          <em>
            You&lsquo;re currently logged in with your Google account. As Google
            handles your authentication, you don&lsquo;t need to configure a
            separate password. If you need to update your account details, you
            can do so through your Google account settings.
          </em>
        </Paragraph>
      ) : (
        <FormBox onSubmit={handleSubmit(onSubmit)}>
          <FormStyle>
            <FormRow label="New Password" error={errors?.password?.message}>
              <FormInput
                type="password"
                id="password"
                placeholder="***"
                disabled={isGoogle}
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Min of 8 chars',
                  },
                })}
              />
            </FormRow>
            <FormRow
              label="Confirm Password"
              error={errors?.passwordConfirm?.message}
            >
              <FormInput
                type="password"
                id="passwordConfirm"
                placeholder="***"
                disabled={isGoogle}
                {...register('passwordConfirm', {
                  required: 'This field is required',
                  validate: (value) =>
                    value === getValues().password || 'Passwords need to match',
                })}
              />
            </FormRow>
          </FormStyle>
          <ButtonContainer>
            <Button>{isUpdating ? <Spinner /> : ''} Save Changes</Button>

            <Button type="reset" disabled={isUpdating} onClick={reset}>
              Cancel
            </Button>
          </ButtonContainer>
        </FormBox>
      )}
    </>
  );
}

export default UpdatePassword;
