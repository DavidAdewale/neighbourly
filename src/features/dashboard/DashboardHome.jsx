import { styled } from 'styled-components';
import SummaryStats from './SummaryStats';
import OtherData from './OtherData';

const DashContent = styled.div`
  margin-top: 2rem;
`;

function DashboardHome({ properties }) {
  const allPropertyIds = properties.map((property) => property.id);

  const numProperties = properties.length;
  const occupiedHouses = properties.filter(
    (property) => property.occupancyStatus === 'occupied'
  );

  const occupiedApartments = properties
    .filter(
      (property) =>
        property.propertyCategory === 'apartment-building' &&
        property.occupancyStatus !== 'vacant'
    )
    .map((apartments) => apartments.propertyDetails.apartments)
    .flat()
    .filter((apartment) => apartment.occupancyStatus === 'occupied');

  const allOccupiedSpaces = [...occupiedHouses, ...occupiedApartments];

  const totalRent = allOccupiedSpaces.reduce(
    (acc, cur) => (acc += cur.actualRentalIncome),
    0
  );

  const numTenants = allOccupiedSpaces.length;

  const numOccupiedHouses = occupiedHouses.length;
  const totalNumHouses = properties.filter(
    (property) => property.propertyCategory === 'house'
  ).length;

  //   const occupancyRateHouses = (numOccupiedHouses / totalNumHouses) * 100;

  const allApartmentBuildings = properties.filter(
    (property) => property.propertyCategory === 'apartment-building'
  );

  const allApartmentOccupancyRateInformation = allApartmentBuildings.map(
    (building) => {
      const numApartments = building.propertyDetails.totalApartments;
      const numOccupiedApartments = building.propertyDetails.apartments.filter(
        (apartment) => apartment.occupancyStatus === 'occupied'
      ).length;

      return {
        totalOccupiedApartments: numOccupiedApartments,
        totalApartments: numApartments,
      };
    }
  );

  const totalOccupiedApartments = allApartmentOccupancyRateInformation.reduce(
    (sum, { totalOccupiedApartments }) => sum + totalOccupiedApartments,
    0
  );
  const totalAvailableApartments = allApartmentOccupancyRateInformation.reduce(
    (sum, { totalApartments }) => sum + totalApartments,
    0
  );

  const overallOccupancyRate =
    ((numOccupiedHouses + totalOccupiedApartments) /
      (totalNumHouses + totalAvailableApartments)) *
    100;

  const summaryData = {
    numProperties,
    totalRent,
    numTenants,
    overallOccupancyRate,
  };

  return (
    <DashContent>
      <SummaryStats summaryData={summaryData} />
      <OtherData propertyIds={allPropertyIds} properties={properties} />
    </DashContent>
  );
}

export default DashboardHome;
