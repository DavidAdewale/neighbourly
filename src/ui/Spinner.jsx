import { css, styled } from 'styled-components';

const Loader = styled.span`
  width: 16px;
  height: 16px;
  border: 2px dotted var(--color-btn-text);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;

  ${(props) =>
    props.type === 'button' &&
    css`
      border: 2px dotted var(--color-text);
    `}

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner({ type }) {
  return <Loader type={type} />;
}

export default Spinner;
