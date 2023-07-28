import Paragraph from './Paragraph';
import { styled } from 'styled-components';

const CardContainer = styled.div`
  max-width: 30%;
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media only screen and (max-width: 56.25em) {
    max-width: 100%;
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const IconCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-text);
  color: var(--color-bg);
  padding: 1rem 1rem;
  border-radius: var(--border-radius);

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

function FeatureCard({ feature }) {
  const { icon, title, paragraph } = feature;
  return (
    <CardContainer>
      <CardTitle>
        <IconCard>{icon}</IconCard>
        <h4>{title}</h4>
      </CardTitle>
      <Paragraph size="small">{paragraph}</Paragraph>
    </CardContainer>
  );
}

export default FeatureCard;
