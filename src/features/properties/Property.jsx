import { useParams } from 'react-router-dom';
import { useProperties } from './useProperties';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import { css, styled } from 'styled-components';
import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';
import Paragraph from '../../ui/Paragraph';
import PropertyHeading from '../../ui/PropertyHeading';
import PropertyImage from '../../ui/PropertyImage';
import PropertyTenantOverview from '../../ui/PropertyTenantOverview';
import { useScrollToTop } from '../../hooks/useScrollToTop';

function Property() {
  useScrollToTop();
  const id = useParams().propertyId;
  const { isLoading, properties } = useProperties();
  if (isLoading) return <FullPageSpinner />;

  const property = properties.filter((property) => property.id === +id).at(0);
  // console.log(property);
  const {
    leaseExpiryDate,
    leaseStartDate,
    occupancyStatus,
    paymentStatus,
    postalCode,
    propertyCategory,
    propertyImage,
    propertyDetails,
    propertyName,
    state,
    tenantEmail,
    tenantName,
  } = property;
  // console.log(propertyDetails);
  return (
    <AppPage>
      <PropertyHeading property={property} />
      <PropertyImage propertyImages={propertyImage} />
      {propertyCategory === 'house' && (
        <PropertyTenantOverview property={property} />
      )}
      {propertyCategory === 'apartment-building' && (
        <PropertyTenantOverview property={property} />
      )}
    </AppPage>
  );
}

export default Property;
