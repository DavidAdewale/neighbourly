import { styled } from 'styled-components';
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDateDistance,
} from '../utilities/helpers';
import {
  OverviewContainer,
  OverviewMeter,
  StyledOverviewParagraph,
} from './LeaseOverview';
import Paragraph from './Paragraph';
import { HiOutlineBanknotes, HiOutlineClock } from 'react-icons/hi2';

const LeaseInfoBox = styled.div`
  margin-top: 4rem;
  border-top: 1px dashed var(--color-light-accent);
  border-bottom: 1px dashed var(--color-light-accent);
  padding: 4rem 0;

  h4 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    color: var(--color-light-accent);
  }
`;
function HouseLeaseDetails({ property }) {
  //   console.log(property);
  return (
    <LeaseInfoBox>
      <h4>Lease Information</h4>
      <OverviewContainer>
        <OverviewMeter>
          <HiOutlineClock />
          {new Date(property.leaseStartDate).toDateString()}
          <StyledOverviewParagraph size="small">
            Lease start date
          </StyledOverviewParagraph>
        </OverviewMeter>

        <OverviewMeter>
          <HiOutlineClock />
          {new Date(property.leaseExpiryDate).toDateString()}
          <StyledOverviewParagraph size="small">
            Lease expiry date
          </StyledOverviewParagraph>
        </OverviewMeter>

        <OverviewMeter
          type={
            formatDateDistance(property.leaseExpiryDate).includes('Exp.')
              ? 'expired'
              : ''
          }
        >
          <HiOutlineClock />
          {formatDateDistance(property.leaseExpiryDate).includes('Exp.')
            ? 'Lease expired'
            : 'Lease expires'}
          <StyledOverviewParagraph
            size="small"
            type={
              formatDateDistance(property.leaseExpiryDate).includes('Exp.')
                ? 'expired'
                : ''
            }
          >
            {formatDateDistance(property.leaseExpiryDate).replace('Exp.', '')}
          </StyledOverviewParagraph>
        </OverviewMeter>
        <OverviewMeter>
          <HiOutlineBanknotes />
          {formatCurrency(property.expectedRentalIncome)}
          <StyledOverviewParagraph size="small">
            Annual Rental Cost
          </StyledOverviewParagraph>
        </OverviewMeter>
      </OverviewContainer>
    </LeaseInfoBox>
  );
}

export default HouseLeaseDetails;
