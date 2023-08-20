import ApartmentBuilding from './ApartmentBuildingOverview';
import HouseOverview from './HouseOverview';

function PropertyTenantOverview({ property }) {
  const { id, propertyCategory, propertyDetails } = property;
  if (propertyCategory === 'house')
    return <HouseOverview property={property} />;

  if (propertyCategory === 'apartment-building')
    return (
      <ApartmentBuilding
        propertyCategory={propertyCategory}
        propertyDetails={propertyDetails}
        id={id}
      />
    );
}

export default PropertyTenantOverview;
