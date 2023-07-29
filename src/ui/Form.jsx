import { styled } from 'styled-components';
import InputContainer from './InputContainer';
import Button from './Button';

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function Form() {
  const inputs = [
    { type: 'email', placeholder: 'you@example.com', label: 'Email' },
    { type: 'password', placeholder: '****', label: 'Password' },
  ];
  return (
    <SignInForm>
      {inputs.map((input) => (
        <InputContainer
          type={input.type}
          placeholder={input.placeholder}
          label={input.label}
          key={input.type}
        />
      ))}
      <Button type="submit">Sign in</Button>
    </SignInForm>
  );
}

export default Form;
