import { css, styled } from 'styled-components';
import {
  HiOutlineExclamationCircle,
  HiOutlineIdentification,
} from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';

import { formatCurrency, formatDateDistance } from '../utilities/helpers';

import AppPage from './AppPage';
import Paragraph from './Paragraph';

const StyledAppPage = styled(AppPage)`
  padding: 2rem 0;
  border-top: 1px dashed var(--color-light-accent);
  border-bottom: 1px dashed var(--color-light-accent);

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
  border: 1px dashed var(--color-btn-secondary-hover);
  /* text-align: center; */
  gap: 2rem;
  border-radius: 2rem;
  transition: all 0.3s;
  cursor: pointer;

  @media only screen and (max-width: 36.5em) {
    min-width: 33rem;
    max-width: 33rem;
  }

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-light-accent);
  }

  &:hover {
    transform: scale(1.01);
  }

  ${(props) =>
    props.type === 'expired' &&
    css`
      background-color: var(--color-btn-reset);
      color: var(--color-btn-text);

      & svg {
        color: var(--color-btn-text);
      }

      & p {
        color: var(--color-btn-text);
      }
    `}
`;

const TenantInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const LeaseInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const RentDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OweParagraph = styled.p`
  color: var(--color-danger);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 5rem;
`;

function ApartmentPropertyDetails({ propertyDetails }) {
  const { apartments } = propertyDetails;
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const occupiedApartments = apartments?.filter(
    (apartment) => apartment.occupancyStatus === 'occupied'
  );

  const vacantApartments = apartments?.filter(
    (apartment) => apartment.occupancyStatus === 'vacant'
  );
  return (
    <StyledAppPage>
      <h4>Property Details</h4>
      <InfoContainer>
        <Paragraph size="large">
          Occupied apartments ({occupiedApartments?.length || 0})
        </Paragraph>
        <DetailsContainter>
          {occupiedApartments &&
            occupiedApartments.map((apartment) => (
              <Detail
                key={apartment.apartmentNumber}
                type={
                  formatDateDistance(apartment.leaseExpiryDate).includes('Exp.')
                    ? 'expired'
                    : 'valid'
                }
                onClick={() =>
                  navigate(
                    `/properties/${propertyId}/edit/${apartment.apartmentNumber}`
                  )
                }
              >
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
                    From: {new Date(apartment.leaseStartDate).toDateString()}
                  </Paragraph>
                  <Paragraph size="small">
                    To: {new Date(apartment.leaseExpiryDate).toDateString()}
                  </Paragraph>
                  <Paragraph size="small">
                    {formatDateDistance(apartment.leaseExpiryDate)}
                  </Paragraph>
                </LeaseInfo>
                <RentDetails>
                  <p>Paid: {formatCurrency(apartment.actualRentalIncome)}</p>
                  <p>Rent: {formatCurrency(apartment.expectedRentalIncome)}</p>
                  {+apartment.actualRentalIncome <
                    +apartment.expectedRentalIncome && (
                    <OweParagraph>
                      {apartment.tenantName.split(' ').at(0)} is owing{' '}
                      {formatCurrency(
                        apartment.expectedRentalIncome -
                          apartment.actualRentalIncome
                      )}
                    </OweParagraph>
                  )}
                </RentDetails>
              </Detail>
            ))}
        </DetailsContainter>
      </InfoContainer>

      <InfoContainer>
        <Paragraph size="large">
          Vacant apartment ({vacantApartments?.length || 0})
        </Paragraph>
        <DetailsContainter>
          {vacantApartments &&
            vacantApartments.map((apartment) => (
              <Detail
                key={apartment.apartmentNumber}
                onClick={() =>
                  navigate(
                    `/properties/${propertyId}/edit/${apartment.apartmentNumber}`
                  )
                }
              >
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
