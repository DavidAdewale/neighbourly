import { styled } from 'styled-components';

import {
  HiOutlineExclamationCircle,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
} from 'react-icons/hi2';
import {
  OverviewContainer,
  OverviewMeter,
  StyledOverviewParagraph,
} from './LeaseOverview';

import { formatDateDistance } from '../utilities/helpers';

import AppPage from './AppPage';
import Paragraph from './Paragraph';

const StyledAppPage = styled(AppPage)`
  border-top: 1px dashed var(--color-light-accent);
`;

function ApartmentDetailsSummary({ propertyDetails }) {
  const apartments = propertyDetails.apartments;
  const noApartments = propertyDetails.totalApartments === 0;

  const vacantApartments = apartments.filter(
    (vacant) => vacant.occupancyStatus === 'vacant'
  );
  const occupiedApartments = apartments.filter(
    (occupied) => occupied.occupancyStatus === 'occupied'
  );

  const owingTenants = occupiedApartments.filter(
    (occupied) => occupied.actualRentalIncome < occupied.expectedRentalIncome
  );

  const numVacant = vacantApartments.length;
  const numOccupied = occupiedApartments.length;

  const expiredRents = apartments.filter((expired) => {
    const endDate = expired.leaseExpiryDate;
    return (
      expired.occupancyStatus !== 'vacant' &&
      formatDateDistance(endDate).includes('Exp.')
    );
  }).length;

  if (noApartments) return;

  return (
    <StyledAppPage>
      <OverviewContainer>
        <OverviewMeter>
          <HiOutlineUserPlus />
          <Paragraph>{numOccupied}</Paragraph>
          <StyledOverviewParagraph size="small">
            occupied apartments
          </StyledOverviewParagraph>
        </OverviewMeter>
        <OverviewMeter>
          <HiOutlineUserMinus />
          <Paragraph>{numVacant}</Paragraph>
          <StyledOverviewParagraph size="small">
            vacant apartments
          </StyledOverviewParagraph>
        </OverviewMeter>
        {expiredRents.length < 1 && (
          <OverviewMeter>
            <HiOutlineExclamationCircle />
            <Paragraph>{expiredRents}</Paragraph>
            <StyledOverviewParagraph size="small">
              expired lease
            </StyledOverviewParagraph>
          </OverviewMeter>
        )}
        {owingTenants.length > 0 && (
          <OverviewMeter>
            <HiOutlineExclamationCircle />
            <Paragraph>{owingTenants.length}</Paragraph>
            <StyledOverviewParagraph size="small">
              Owing tenant{owingTenants.length > 1 ? 's' : ''}
            </StyledOverviewParagraph>
          </OverviewMeter>
        )}
      </OverviewContainer>
    </StyledAppPage>
  );
}

export default ApartmentDetailsSummary;
