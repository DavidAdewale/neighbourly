import { css, styled } from 'styled-components';

const Paragraph = styled.p`
  ${(props) =>
    props.size === 'small' &&
    css`
      font-size: 1.2rem;
    `}
  ${(props) =>
    props.size === 'regular' &&
    css`
      font-size: 1.4rem;
    `}
    ${(props) =>
    props.size === 'large' &&
    css`
      font-size: 1.6rem;
    `}
`;

Paragraph.defaultProps = {
  size: 'regular',
};

export default Paragraph;
