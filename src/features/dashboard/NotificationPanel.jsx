import { styled } from 'styled-components';
import RecentActivity from './RecentActivity';
import OccupancyStatusChart from './OccupancyStatusChart';
import IncomeExpensesContainer from './IncomeExpensesContainer';
import FinanceChart from './FinanceChart';

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
`;

const NotificationContainer = styled.div`
  width: 45rem;
  max-height: 40rem;
  padding: 2rem 0;
  border-radius: 2.5rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-light-accent);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  & ::-webkit-scrollbar {
    display: none;
  }
`;

const Heading = styled.div`
  padding: 0 2rem;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function NotificationPanel({ records, properties }) {
  const currentDate = new Date().toISOString().split('T').at(0);
  const todaysActivity = records.filter(
    (record) => record.transactionDate === currentDate
  );

  return (
    <Panel>
      <NotificationContainer>
        <Heading>
          <h4>Recent activity</h4>
        </Heading>
        <RecentActivity activities={todaysActivity} />
      </NotificationContainer>
      <SummaryContainer>
        <IncomeExpensesContainer records={records} />
      </SummaryContainer>
      <NotificationContainer>
        <Heading>
          <h4>Occupancy rate summary (%)</h4>
        </Heading>
        <OccupancyStatusChart properties={properties} />
      </NotificationContainer>
      <FinanceChart records={records} />
    </Panel>
  );
}

export default NotificationPanel;
