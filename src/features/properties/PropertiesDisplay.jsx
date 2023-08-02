import { styled } from 'styled-components';
import PropertiesCard from './PropertiesCard';

const DisplayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

function PropertiesDisplay({ properties }) {
  return (
    <DisplayBox>
      {properties.map((property) => (
        <PropertiesCard property={property} key={property.propertyName} />
      ))}
    </DisplayBox>
  );
}

export default PropertiesDisplay;
