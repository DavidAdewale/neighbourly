import { styled } from 'styled-components';
import { PiWarningThin } from 'react-icons/pi';

import PropertiesCard from './PropertiesCard';
import Paragraph from '../../ui/Paragraph';

const DisplayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Empty = styled.div`
  padding: 15rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--color-danger);

  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

function PropertiesDisplay({ properties }) {
  if (properties.length === 0)
    return (
      <Empty>
        <PiWarningThin />
        <Paragraph color="faded">No properties to display</Paragraph>
      </Empty>
    );
  return (
    <DisplayBox>
      {properties.map((property) => (
        <PropertiesCard property={property} key={property.propertyName} />
      ))}
    </DisplayBox>
  );
}

export default PropertiesDisplay;
