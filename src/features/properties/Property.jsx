import { useParams } from 'react-router-dom';

import { useProperties } from './useProperties';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import PropertyHeading from '../../ui/PropertyHeading';
import PropertyImage from '../../ui/PropertyImage';
import PropertyTenantOverview from '../../ui/PropertyTenantOverview';
import ApartmentPropertyDetails from '../../ui/ApartmentPropertyDetails';
import ApartmentDetailsSummary from '../../ui/ApartmentDetailsSummary';
import UpdatePropertyButton from './UpdatePropertyButton';

function Property() {
  useScrollToTop();
  const id = useParams().propertyId;
  const { isLoading, properties } = useProperties();

  const property = properties?.filter((property) => property.id === +id).at(0);

  useDocumentTitle(property?.propertyName || 'Loading...');

  if (isLoading) return <FullPageSpinner />;
  const { propertyImage, propertyDetails } = property;

  return (
    <AppPage>
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
