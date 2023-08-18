import { styled } from 'styled-components';

export const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 1.5rem;
  filter: brightness(0.7);
  transition: all 0.3s;

  &:hover {
    filter: brightness(1);
  }
`;
