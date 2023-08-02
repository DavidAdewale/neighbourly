import { css, styled } from 'styled-components';
import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';

import Paragraph from '../../ui/Paragraph';
import PropertyCard from './PropertyCard';
import { useNavigate } from 'react-router-dom';

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

const OccupancyStatus = styled.span`
  display: inline-block;
  /* background-color: var(--color-main); */
  color: var(--color-btn-text);
  padding: 0.2rem 2rem;
  border-radius: 5em;

  ${(props) =>
    props.type === 'occupied' &&
    css`
      background-color: var(--color-occupied);
    `}

  ${(props) =>
    props.type === 'partially-occupied' &&
    css`
      background-color: var(--color-partially-occupied);
    `}
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
      <img src={image} alt={`${propertyName}`} />

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
            {address}, {city}, {state}
          </Paragraph>
          <Paragraph size="small" color="faded">
            Amenities: {amenities.join(', ')}
          </Paragraph>
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
