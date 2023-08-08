import {
  HiOutlineBuildingOffice,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
} from 'react-icons/hi2';
import { capitalizeFirstLetter } from '../utilities/helpers';
import Paragraph from './Paragraph';
import HouseLeaseDetails from './HouseLeaseDetails';
import {
  OverviewContainer,
  OverviewMeter,
  StyledOverviewParagraph,
} from './LeaseOverview';
import Button from './Button';
import { AddTenantBlock } from './AddTenantBlock';
import { useNavigate } from 'react-router-dom';

function PropertyTenantOverview({ property }) {
  const navigate = useNavigate();
  const {
    id,
    occupancyStatus,
    propertyCategory,
    tenantName,
    tenantEmail,
    propertyDetails,
  } = property;
  //   console.log(property);
  if (propertyCategory === 'house')
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
          <HouseLeaseDetails property={property} />
        )}
        {occupancyStatus === 'vacant' && (
          <AddTenantBlock>
            Has this property been rented? <Button>Add tenant</Button>
          </AddTenantBlock>
        )}
      </>
    );

  if (propertyCategory === 'apartment-building')
    return (
      <>
        <OverviewContainer>
          <OverviewMeter>
            <HiOutlineHomeModern />
            <Paragraph>{capitalizeFirstLetter(propertyCategory)}</Paragraph>
            <StyledOverviewParagraph size="small">
              Property Category
            </StyledOverviewParagraph>
          </OverviewMeter>
          {propertyDetails && (
            <OverviewMeter>
              <HiOutlineBuildingOffice />
              <Paragraph>{propertyDetails.totalApartments}</Paragraph>
              <StyledOverviewParagraph size="small">
                apartments
              </StyledOverviewParagraph>
            </OverviewMeter>
          )}
        </OverviewContainer>
        {!propertyDetails && (
          <AddTenantBlock>
            Add more information about this property{' '}
            <Button onClick={() => navigate(`/properties/${id}/adddetails`)}>
              Add property details
            </Button>
          </AddTenantBlock>
        )}
      </>
    );
}

export default PropertyTenantOverview;
