import { styled } from 'styled-components';
import Button from './Button';
import FormRow from './FormRow';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSignin } from '../authentication/useSignin';

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signin, isLoading } = useSignin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    if (isLoading) return;

    signin({ email, password });
  }

  return (
    <SignInForm onSubmit={handleSubmit}>
      <FormRow label="Email">
        <FormInput
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password">
        <FormInput
          id="password"
          type="password"
          placeholder="****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <Button type="submit">Sign in</Button>
      <Link to="/">Go back</Link>
    </SignInForm>
  );
}

export default Form;
