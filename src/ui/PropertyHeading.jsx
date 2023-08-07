import { css, styled } from 'styled-components';
import OccupancyStatus from './OccupancyStatus';
import { capitalizeFirstLetter, formatCurrency } from '../utilities/helpers';
import Paragraph from './Paragraph';

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-direction: column; */
  gap: 2rem;

  @media only screen and (max-width: 56.5em) {
    flex-direction: column;
    text-align: center;
  }
`;

const PropertyTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  gap: 0.8rem;
  @media only screen and (max-width: 37.5em) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const AddressBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const IncomeBlock = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 36.75em) {
    flex-direction: column-reverse;
  }
`;

const Income = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem;
  border-radius: 1rem;
  gap: 0.6rem;

  border: 1px solid var(--color-light-accent);
  background-color: var(--color-card-bg);

  h3 {
    font-family: 'Space Mono', sans-serif;
  }

  ${(props) =>
    props.block === 'full' &&
    css`
      background-color: var(--color-main);
      border: 1px solid var(--color-main);
      color: var(--color-btn-text);
    `}
  ${(props) =>
    props.block === 'not' &&
    css`
      background-color: var(--color-danger);
      border: 1px solid var(--color-danger);
      color: var(--color-btn-text);
    `}
`;

function PropertyHeading({ property }) {
  const {
    propertyName,
    occupancyStatus,
    address,
    city,
    state,
    amenities,
    expectedRentalIncome,
    actualRentalIncome,
  } = property;
  return (
    <Heading>
      <PropertyTitle>
        <Title>
          <h1>{propertyName}</h1>
          <OccupancyStatus type={occupancyStatus}>
            <Paragraph size="small">
              {' '}
              {capitalizeFirstLetter(occupancyStatus)}
            </Paragraph>
          </OccupancyStatus>
        </Title>
        <AddressBlock>
          <Paragraph>
            {' '}
            {address}, {city}, {state}{' '}
          </Paragraph>
          <Paragraph color="faded">
            Amenities:{' '}
            {amenities
              .map((amenity) => capitalizeFirstLetter(amenity))
              .join(', ')}
          </Paragraph>
        </AddressBlock>
      </PropertyTitle>
      <IncomeBlock>
        <Income>
          <h3>{formatCurrency(expectedRentalIncome)}</h3>
          <Paragraph size="small">Expected Rental Income</Paragraph>
        </Income>
        <Income
          block={actualRentalIncome >= expectedRentalIncome ? 'full' : 'not'}
        >
          <h3>{formatCurrency(actualRentalIncome)}</h3>
          <Paragraph size="small">Actual Rental Income</Paragraph>
        </Income>
      </IncomeBlock>
    </Heading>
  );
}

export default PropertyHeading;
