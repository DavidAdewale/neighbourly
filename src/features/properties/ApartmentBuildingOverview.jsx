import { HiOutlineBuildingOffice, HiOutlineHomeModern } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import {
  OverviewContainer,
  OverviewMeter,
  StyledOverviewParagraph,
} from '../../ui/LeaseOverview';
import { AddTenantBlock } from '../../ui/AddTenantBlock';
import { capitalizeFirstLetter } from '../../utilities/helpers';

import Button from '../../ui/Button';
import Paragraph from '../../ui/Paragraph';

function ApartmentBuildingOverview({ propertyCategory, propertyDetails, id }) {
  const navigate = useNavigate();
  const noApartments = propertyDetails && propertyDetails.totalApartments === 0;
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

      {(!propertyDetails || noApartments) && (
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

export default ApartmentBuildingOverview;
