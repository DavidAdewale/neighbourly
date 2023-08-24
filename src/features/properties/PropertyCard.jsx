import { styled } from 'styled-components';

const PropertyCard = styled.div`
  width: 45rem;
  border-radius: 0.8rem;
  background-color: var(--color-card-bg);

  border: 1px solid transparent;
  cursor: pointer;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  border: 1px solid var(--color-form-btn);
  box-shadow: none;

  transition: all 0.3s;

  &:hover {
    box-shadow: var(--box-shadow);
  }

  h3 {
    font-family: 'Space Mono', monospace;
    font-size: 2.2rem;
    color: var(--color-main);
  }
`;

export default PropertyCard;
