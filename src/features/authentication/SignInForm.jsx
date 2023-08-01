import { useState } from 'react';

import { useSignin } from './useSignin';

import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import Spinner from '../../ui/Spinner';
import FormBox from '../../ui/FormBox';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabled = email === '' || password === '' ? true : false;

  const { signin, isLoading } = useSignin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    signin(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <FormBox onSubmit={handleSubmit}>
      <FormRow label="Email">
        <FormInput
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password">
        <FormInput
          id="password"
          type="password"
          placeholder="****"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <Button type="submit" disabled={disabled}>
        {isLoading ? <Spinner /> : 'Sign in'}
      </Button>
    </FormBox>
  );
}

export default SignInForm;
