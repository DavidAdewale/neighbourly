import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormBox from '../../ui/FormBox';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import { useSignup } from './useSignup';
import Spinner from '../../ui/Spinner';

function SignUpForm() {
  const { signup, isLoading } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: reset });
  }
  return (
    <FormBox onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <FormInput
          id="fullName"
          type="text"
          placeholder="Jane Doe"
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <FormInput
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <FormInput
          id="password"
          type="password"
          placeholder="****"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
      >
        <FormInput
          id="passwordConfirm"
          type="password"
          placeholder="****"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>
      <Button type="submit" onClick={reset} disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Create account'}
      </Button>
    </FormBox>
  );
}

export default SignUpForm;
