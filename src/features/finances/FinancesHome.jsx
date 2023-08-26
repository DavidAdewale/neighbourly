import { styled } from 'styled-components';
import { PiWarningThin } from 'react-icons/pi';
import { Empty } from '../../ui/Empty';

import FinancePropertyCard from './FinancePropertyCard';
import Paragraph from '../../ui/Paragraph';

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  @media only screen and (max-width: 112rem) {
    gap: 3rem;
  }
`;

const EmplyBlock = styled.div`
  width: 100%;
`;
function FinancesHome({ properties }) {
  return (
    <PageLayout>
      {properties.length > 0 &&
        properties.map((property) => (
          <FinancePropertyCard
            property={property}
            key={property.propertyName + Math.random(property.id)}
          />
        ))}
      {properties.length === 0 && (
        <EmplyBlock>
          <Empty>
            <PiWarningThin />
            <Paragraph color="faded">No properties to display</Paragraph>
          </Empty>
        </EmplyBlock>
      )}
    </PageLayout>
  );
}

export default FinancesHome;
