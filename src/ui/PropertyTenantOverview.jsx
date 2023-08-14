import ApartmentBuilding from '../features/properties/ApartmentBuildingOverview';
import HouseOverview from '../features/properties/HouseOverview';

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
