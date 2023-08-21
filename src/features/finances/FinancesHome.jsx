import { styled } from 'styled-components';
import FinancePropertyCard from './FinancePropertyCard';

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  @media only screen and (max-width: 112rem) {
    gap: 3rem;
  }
`;
function FinancesHome({ properties }) {
  return (
    <PageLayout>
      {properties.map((property) => (
        <FinancePropertyCard
          property={property}
          key={property.propertyName + Math.random(property.id)}
        />
      ))}
    </PageLayout>
  );
}

export default FinancesHome;
