import { useNavigate, useParams } from 'react-router-dom';

import { IoChevronBackOutline } from 'react-icons/io5';

import { useProperties } from './useProperties';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import PropertyHeading from './PropertyHeading';
import PropertyImage from './PropertyImage';
import PropertyTenantOverview from './PropertyTenantOverview';
import ApartmentPropertyDetails from './ApartmentPropertyDetails';
import ApartmentDetailsSummary from './ApartmentDetailsSummary';
import UpdatePropertyButton from './UpdatePropertyButton';
import Button from '../../ui/Button';
import { styled } from 'styled-components';

const BackContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 56.25em) {
    justify-content: flex-start;
  }
`;

function Property() {
  useScrollToTop();
  const id = useParams().propertyId;
  const { isLoading, properties } = useProperties();
  const navigate = useNavigate();

  const property = properties?.filter((property) => property.id === +id).at(0);

  useDocumentTitle(property?.propertyName || 'Loading...');

  if (isLoading) return <FullPageSpinner />;
  const { propertyImage, propertyDetails } = property;

  return (
    <AppPage>
      <BackContainer>
        <Button variation="secondary" onClick={() => navigate('/properties')}>
          <IoChevronBackOutline />
          Back
        </Button>
      </BackContainer>
      <PropertyHeading property={property} />
      <PropertyImage propertyImages={propertyImage} />
      <UpdatePropertyButton id={id} />
      <PropertyTenantOverview property={property} />
      {propertyDetails && (
        <>
          <ApartmentDetailsSummary propertyDetails={propertyDetails} />
          <ApartmentPropertyDetails propertyDetails={propertyDetails} />
        </>
      )}
    </AppPage>
  );
}

export default Property;
