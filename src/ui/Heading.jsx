import { css, styled } from 'styled-components';

const Heading = styled.h1`
  ${(props) => props.as === 'h1' && css``}
`;
