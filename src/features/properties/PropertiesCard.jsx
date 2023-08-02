import { HiOutlineHome } from 'react-icons/hi2';
import { styled } from 'styled-components';
import Paragraph from '../../ui/Paragraph';

const StyledPropertyCard = styled.div`
  width: 400px;
  border-radius: 0.8rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 18rem;
    object-fit: cover;
    object-position: center;
  }

  span {
    display: inline-block;
    background-color: var(--color-main);
    color: var(--color-btn-text);
    padding: 0.2rem 2rem;
    border-radius: 5em;
  }
`;

const PropertyName = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.3rem;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function PropertiesCard({ property }) {
  return (
    <StyledPropertyCard>
      <img src={property.propertyImage.at(0)} />
      <CardTitle>
        <PropertyName>{property.propertyName}</PropertyName>

        <Paragraph size="small">
          <HiOutlineHome /> {property.propertyCategory.toUpperCase()}
        </Paragraph>
      </CardTitle>
      <h3>{property.expectedRentalIncome}</h3>
      <Paragraph size="regular">
        {property.address}, {property.city}, {property.state}
      </Paragraph>
      <Paragraph size="small">{property.amenities.join(', ')}</Paragraph>
      <span>{property.occupancyStatus}</span>
    </StyledPropertyCard>
  );
}

export default PropertiesCard;
