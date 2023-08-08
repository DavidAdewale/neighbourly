import { styled } from 'styled-components';
import AppPage from './AppPage';
import { formatCurrency, formatDateDistance } from '../utilities/helpers';
import Paragraph from './Paragraph';
import {
  HiOutlineExclamationCircle,
  HiOutlineIdentification,
} from 'react-icons/hi2';

const StyledAppPage = styled(AppPage)`
  border-top: 1px dashed var(--color-light-accent);

  h4 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    color: var(--color-btn-text-faded);
    margin-bottom: 3rem;
  }
`;

const DetailsContainter = styled.div`
  padding: 2rem 0;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Detail = styled.div`
  min-width: 45rem;
  max-width: 45rem;
  background-color: var(--color-card-bg);
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  border: 1px dashed var(--color-btn-text-faded);
  /* text-align: center; */
  gap: 2rem;
  border-radius: 2rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-light-accent);
  }
`;

const TenantInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const LeaseInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const RentDetails = styled.div`
  display: flex;
  gap: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

function ApartmentPropertyDetails({ propertyDetails }) {
  const { apartments } = propertyDetails;

  const occupiedApartments = apartments.filter(
    (apartment) => apartment.occupancyStatus === 'occupied'
  );

  const vacantApartments = apartments.filter(
    (apartment) => apartment.occupancyStatus === 'vacant'
  );
  return (
    <StyledAppPage>
      <h4>Property Details</h4>
      <InfoContainer>
        <Paragraph size="large">
          Occupied apartments ({occupiedApartments.length})
        </Paragraph>
        <DetailsContainter>
          {occupiedApartments.map((apartment) => (
            <Detail key={apartment.apartmentNumber}>
              <HiOutlineIdentification />
              <Paragraph color="faded">
                APARTMENT {apartment.apartmentNumber}
              </Paragraph>
              <TenantInfo>
                <p>{apartment.tenantName}</p>
                <Paragraph color="faded">{apartment.tenantEmail}</Paragraph>
              </TenantInfo>
              <LeaseInfo>
                <Paragraph size="small">
                  From {new Date(apartment.leaseStartDate).toDateString()}
                </Paragraph>
                <Paragraph size="small">
                  to {new Date(apartment.leaseExpiryDate).toDateString()}
                </Paragraph>
                <Paragraph size="small">
                  {formatDateDistance(
                    apartment.leaseStartDate,
                    apartment.leaseExpiryDate
                  )}
                </Paragraph>
              </LeaseInfo>
              <RentDetails>
                <p>Paid: {formatCurrency(apartment.actualRentalIncome)}</p>
                <p>Rent: {formatCurrency(apartment.expectedRentalIncome)}</p>
              </RentDetails>
            </Detail>
          ))}
        </DetailsContainter>
      </InfoContainer>

      <InfoContainer>
        <Paragraph size="large">
          Vacant apartment ({vacantApartments.length})
        </Paragraph>
        <DetailsContainter>
          {vacantApartments.map((apartment) => (
            <Detail key={apartment.apartmentNumber}>
              <HiOutlineExclamationCircle />
              <Paragraph color="faded">
                APARTMENT {apartment.apartmentNumber}
              </Paragraph>
              <Paragraph>Vacant</Paragraph>
              <RentDetails>
                <p>Rent: {formatCurrency(apartment.expectedRentalIncome)}</p>
              </RentDetails>
            </Detail>
          ))}
        </DetailsContainter>
      </InfoContainer>
    </StyledAppPage>
  );
}

export default ApartmentPropertyDetails;
