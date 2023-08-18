import { styled } from 'styled-components';
import { PiWarningThin } from 'react-icons/pi';

import PropertiesCard from './PropertiesCard';
import Paragraph from '../../ui/Paragraph';
import { Empty } from '../../ui/Empty';

const DisplayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
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
