import { styled } from 'styled-components';
import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';

import Paragraph from '../../ui/Paragraph';
import PropertyCard from './PropertyCard';
import { useNavigate } from 'react-router-dom';
import OccupancyStatus from '../../ui/OccupancyStatus';

const PropertyName = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;

const CardTitle = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-form-btn);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.div`
  overflow: hidden;

  &:hover > img {
    transform: scale(1.1);
    filter: brightness(1);
  }

  img {
    width: 100%;
    min-height: 100%;
    height: 18rem;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.8);

    transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem 2rem;
`;

const Address = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;

  border-bottom: 1px solid var(--color-form-btn);
  margin-bottom: 1rem;
`;

function PropertiesCard({ property }) {
  const {
    id,
    propertyName,
    amenities,
    propertyCategory,
    expectedRentalIncome,
    address,
    city,
    state,
    occupancyStatus,
  } = property;

  const navigate = useNavigate();
  const image = property.propertyImage.at(0);

  function handleClick() {
    navigate(`/properties/${id}`);
  }
  return (
    <PropertyCard onClick={handleClick}>
      <Image>
        {property.propertyImage.length === 0 ? (
          <img src="/no-image.jpg" alt="no-image" />
        ) : (
          <img src={image} alt={`${propertyName}`} />
        )}
      </Image>

      <CardBody>
        <CardTitle>
          <PropertyName>{propertyName}</PropertyName>
          <Paragraph size="small" color="faded">
            {capitalizeFirstLetter(propertyCategory)}
          </Paragraph>
        </CardTitle>

        <h3> {formatCurrency(expectedRentalIncome)}</h3>
        <Address>
          <Paragraph size="regular">
            {capitalizeFirstLetter(address)}, {capitalizeFirstLetter(city)},{' '}
            {capitalizeFirstLetter(state)}
          </Paragraph>
          {amenities.length > 0 && (
            <Paragraph size="small" color="faded">
              Amenities:{' '}
              {amenities
                .map((amenity) => capitalizeFirstLetter(amenity))
                .join(', ')}
            </Paragraph>
          )}
        </Address>
        <Paragraph size="small">
          <OccupancyStatus type={occupancyStatus.toLowerCase()}>
            {capitalizeFirstLetter(occupancyStatus)}
          </OccupancyStatus>
        </Paragraph>
      </CardBody>
    </PropertyCard>
  );
}

export default PropertiesCard;
