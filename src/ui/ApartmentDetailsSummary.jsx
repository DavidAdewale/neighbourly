import {
  HiOutlineExclamationCircle,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
} from 'react-icons/hi2';
import AppPage from './AppPage';
import {
  OverviewContainer,
  OverviewMeter,
  StyledOverviewParagraph,
} from './LeaseOverview';
import Paragraph from './Paragraph';
import { formatDateDistance } from '../utilities/helpers';

function ApartmentDetailsSummary({ propertyDetails }) {
  const apartments = propertyDetails.apartments;
  const vacantApartments = apartments.filter(
    (vacant) => vacant.occupancyStatus === 'vacant'
  );
  const occupiedApartments = apartments.filter(
    (occupied) => occupied.occupancyStatus === 'occupied'
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

  return (
    <AppPage>
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
        <OverviewMeter>
          <HiOutlineExclamationCircle />
          <Paragraph>{expiredRents}</Paragraph>
          <StyledOverviewParagraph size="small">
            expired lease
          </StyledOverviewParagraph>
        </OverviewMeter>
      </OverviewContainer>
    </AppPage>
  );
}

export default ApartmentDetailsSummary;
