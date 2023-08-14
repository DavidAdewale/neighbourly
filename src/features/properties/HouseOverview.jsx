import { useNavigate } from 'react-router-dom';
import {
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineUser,
} from 'react-icons/hi2';
import {
  OverviewContainer,
  OverviewMeter,
  StyledOverviewParagraph,
} from '../../ui/LeaseOverview';

import { capitalizeFirstLetter } from '../../utilities/helpers';
import { AddTenantBlock } from '../../ui/AddTenantBlock';

import Paragraph from '../../ui/Paragraph';
import HouseLeaseDetails from '../../ui/HouseLeaseDetails';
import Button from '../../ui/Button';

function HouseOverview({ property }) {
  const navigate = useNavigate();
  const { propertyCategory, occupancyStatus, tenantName, tenantEmail, id } =
    property;
  return (
    <>
      <OverviewContainer>
        <OverviewMeter>
          <HiOutlineHome />
          <Paragraph>{capitalizeFirstLetter(propertyCategory)}</Paragraph>
          <StyledOverviewParagraph size="small">
            Property Category
          </StyledOverviewParagraph>
        </OverviewMeter>

        {occupancyStatus === 'occupied' && (
          <>
            <OverviewMeter>
              <HiOutlineUser /> <Paragraph>{tenantName}</Paragraph>
              <StyledOverviewParagraph size="small">
                Tenant Name
              </StyledOverviewParagraph>
            </OverviewMeter>

            <OverviewMeter>
              <HiOutlineEnvelope /> <Paragraph>{tenantEmail}</Paragraph>
              <StyledOverviewParagraph size="small">
                Tenant E-mail
              </StyledOverviewParagraph>
            </OverviewMeter>
          </>
        )}
      </OverviewContainer>
      {occupancyStatus === 'occupied' && (
        <>
          <HouseLeaseDetails property={property} />
          <OverviewContainer>
            <Button onClick={() => navigate(`/properties/${id}/edit`)}>
              Update tenant&lsquo;s record
            </Button>
          </OverviewContainer>
        </>
      )}
      {occupancyStatus === 'vacant' && (
        <AddTenantBlock>
          Has this property been rented?{' '}
          <Button onClick={() => navigate(`/properties/${id}/edit`)}>
            Add tenant
          </Button>
        </AddTenantBlock>
      )}
    </>
  );
}

export default HouseOverview;
