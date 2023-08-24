import { styled } from 'styled-components';
import RecentActivity from './RecentActivity';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
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

function NotificationPanel({ records }) {
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
      <NotificationContainer>
        <Heading>
          <h4>Occupancy rate summary</h4>
        </Heading>
        Notifications
      </NotificationContainer>
    </Panel>
  );
}

export default NotificationPanel;
