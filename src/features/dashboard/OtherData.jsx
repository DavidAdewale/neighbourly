import { styled } from 'styled-components';
import FullPageSpinner from '../../ui/FullPageSpinner';
import { useFinances } from '../finances/useFinances';
import { OperationPanel } from '../../ui/OperationPanel';
import { OperationsTab } from '../../ui/OperationsTab';
import Filter from '../../ui/Filter';
import NotificationPanel from './NotificationPanel';

const DataContainer = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--color-light-accent);
  display: flex;
  flex-direction: column;
`;

function OtherData({ propertyIds, properties }) {
  const { records, isLoadingRecords } = useFinances(propertyIds, true);

  if (isLoadingRecords) return <FullPageSpinner />;

  return (
    <DataContainer>
      <OperationPanel>
        <OperationsTab>
          <Filter
            filterField="category"
            options={[
              { value: 'all', label: 'All' },
              { value: 'income', label: 'Income' },
              { value: 'expenses', label: 'Expenses' },
            ]}
          />
          <Filter
            filterField="timeInterval"
            options={[
              { value: 'currentYear', label: 'This year' },
              { value: 'past6Months', label: 'Past 6 months' },
              { value: 'pastQuarter', label: 'Past quater' },
              { value: 'pastTwoYears', label: 'Last 2 years' },
              { value: 'pastFiveYears', label: 'Last 5 years' },
              { value: 'all', label: 'All' },
            ]}
          />
        </OperationsTab>
      </OperationPanel>
      <NotificationPanel records={records} properties={properties} />
    </DataContainer>
  );
}

export default OtherData;
