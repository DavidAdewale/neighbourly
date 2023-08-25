import { styled } from 'styled-components';
import { useProperties } from '../features/properties/useProperties';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useScrollToTop } from '../hooks/useScrollToTop';
import AppPage from '../ui/AppPage';
import AppPageTitle from '../ui/AppPageTitle';
import FullPageSpinner from '../ui/FullPageSpinner';
import Paragraph from '../ui/Paragraph';
import TenantList from '../features/tenants/TenantList';

const Heading = styled.div`
  display: flex;
  gap: 1rem;
`;

function Tenants() {
  useDocumentTitle('Tenants');
  useScrollToTop();
  const { properties, isLoading } = useProperties();
  if (isLoading) return <FullPageSpinner />;
  const houses = properties.filter(
    (property) => property.propertyCategory === 'house'
  );

  const apartmentBuildings = properties.filter(
    (property) => property.propertyCategory === 'apartment-building'
  );

  const allApartments = apartmentBuildings.filter(
    (building) =>
      building.occupancyStatus === 'occupied' ||
      building.occupancyStatus === 'partially-occupied' ||
      building.occupancyStatus === 'vacant'
  );

  const occupiedHouses = houses.filter(
    (house) => house.occupancyStatus === 'occupied'
  );

  const allOccupiedApartments = allApartments.map((building) => {
    return {
      id: building.id,
      propertyName: building.propertyName,
      propertyCategory: building.propertyCategory,
      apartments: building.propertyDetails?.apartments.filter(
        (apartment) => apartment.occupancyStatus === 'occupied'
      ),
    };
  });

  // const allVacantApartments = allApartments.map((building) => {
  //   return {
  //     id: building.id,
  //     propertyName: building.propertyName,
  //     propertyCategory: building.propertyCategory,
  //     apartments: building.propertyDetails.apartments.filter(
  //       (apartment) => apartment.occupancyStatus === 'vacant'
  //     ),
  //   };
  // });

  const numOccupiedHouses = occupiedHouses.length;
  const numOccupiedApartments = allOccupiedApartments.reduce(
    (acc, building) => {
      if (!building.apartments) return acc;
      return acc + (building.apartments?.length || 0);
    },
    0
  );

  console.log(numOccupiedHouses);

  const totalTenants = numOccupiedHouses + numOccupiedApartments;

  return (
    <AppPage>
      <AppPageTitle>
        <Heading>
          <h3>Tenants</h3>
          <Paragraph>({totalTenants})</Paragraph>
        </Heading>
      </AppPageTitle>
      <TenantList
        occupiedApartments={allOccupiedApartments}
        occupiedHouses={occupiedHouses}
      />
    </AppPage>
  );
}

export default Tenants;
