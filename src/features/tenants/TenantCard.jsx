import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDateDistance,
} from '../../utilities/helpers';
import { HiOutlineHome, HiOutlineIdentification } from 'react-icons/hi2';
import Paragraph from '../../ui/Paragraph';

const StyledTenantCard = styled.div`
  width: 40rem;
  background-color: var(--color-card-bg);
  padding: 2rem 2rem;
  border-radius: 2.5rem;
  cursor: pointer;
  border: 1px dashed var(--color-btn-text-faded);
  transition: all 0.1s;

  @media only screen and (max-width: 112rem) {
    width: 35rem;
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-light-accent);
  }

  ${(props) =>
    props.type === 'expired' &&
    css`
      background-color: var(--color-btn-reset);
      color: var(--color-btn-text);
      border: 1px dashed transparent;

      & svg {
        color: currentColor;
      }
    `}

  &:hover {
    transform: scale(1.03);
  }
`;

const PropertyName = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  margin-bottom: 0.7rem;
  border-bottom: 1px dashed var(--color-light-accent);

  & p {
    text-transform: uppercase;
    letter-spacing: 0.3rem;
  }

  & div {
    display: flex;
    gap: 1rem;
    align-items: center;

    & svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    & p {
      font-size: 1.2rem;
      text-transform: none;
      letter-spacing: 0;
      color: var(--color-light-accent);
    }
  }

  ${({ type }) =>
    type === 'exp' &&
    css`
      border-bottom: 1px dashed var(--color-btn-text);
      & div {
        & p {
          color: var(--color-btn-text);
        }
      }
    `}
`;

const TenantDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExpiresSoon = styled.p`
  color: var(--color-danger);
`;
function TenantCard({ property }) {
  const navigate = useNavigate();
  const {
    id,
    leaseStartDate,
    leaseExpiryDate,
    propertyCategory,
    propertyName,
    apartmentNumber,
    tenantEmail,
    tenantName,
    expectedRentalIncome,
    actualRentalIncome,
  } = property;

  return (
    <StyledTenantCard
      type={
        formatDateDistance(leaseExpiryDate).includes('Exp.') ? 'expired' : ''
      }
      onClick={() => {
        propertyCategory === 'house'
          ? navigate(`/properties/${id}/edit`)
          : navigate(`/properties/${id}/edit/${apartmentNumber}`);
      }}
    >
      <HiOutlineIdentification />
      <PropertyName
        type={formatDateDistance(leaseExpiryDate).includes('Exp.') ? 'exp' : ''}
      >
        <p>{propertyName}</p>
        <div>
          <HiOutlineHome /> <p>{capitalizeFirstLetter(propertyCategory)}</p>
        </div>
      </PropertyName>
      <CardBody>
        <TenantDetails>
          <Paragraph>{tenantName}</Paragraph>
          <Paragraph
            color={
              formatDateDistance(leaseExpiryDate).includes('Exp.')
                ? ''
                : 'faded'
            }
          >
            {tenantEmail}
          </Paragraph>
        </TenantDetails>
        <div>
          Paid {formatCurrency(actualRentalIncome)} of{' '}
          {formatCurrency(expectedRentalIncome)}
        </div>
        <div>
          Leased from {new Date(leaseStartDate).toDateString()} to{' '}
          {new Date(leaseExpiryDate).toDateString()}
        </div>
        {formatDateDistance(leaseExpiryDate).includes('Exp.') && (
          <div>
            Lease{' '}
            {formatDateDistance(leaseExpiryDate).replace('Exp.', 'expired')}
          </div>
        )}
        {formatDateDistance(leaseExpiryDate).includes('days') &&
          !formatDateDistance(leaseExpiryDate).includes('Exp.') && (
            <ExpiresSoon>
              Rent expires {formatDateDistance(leaseExpiryDate).toLowerCase()}
            </ExpiresSoon>
          )}
      </CardBody>
    </StyledTenantCard>
  );
}

export default TenantCard;
