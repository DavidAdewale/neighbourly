import { css, styled } from 'styled-components';

const Heading = styled.h1`
  ${(props) => props.as === 'h1' && css``}

  ${(props) =>
    props.as === 'h3' &&
    css`
      margin-bottom: 2rem;
    `}
`;

export default Heading;
