import { styled } from 'styled-components';
import { Empty } from '../../ui/Empty';

import TenantCard from './TenantCard';
import { PiWarningThin } from 'react-icons/pi';
import Paragraph from '../../ui/Paragraph';

const PageBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

function TenantViews({ properties }) {
  if (properties.length === 0) {
    return (
      <Empty>
        <PiWarningThin />
        <Paragraph color="faded">No tenant to display</Paragraph>
      </Empty>
    );
  } else {
    return (
      <PageBody>
        {properties.map((property) => {
          if (!property) return;
          const { id, propertyName } = property;
          return (
            <TenantCard
              property={property}
              key={propertyName + Math.random() * id}
            />
          );
        })}
      </PageBody>
    );
  }
}

export default TenantViews;
