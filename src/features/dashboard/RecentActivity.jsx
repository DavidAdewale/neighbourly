import { styled } from 'styled-components';
import { Empty } from '../../ui/Empty';
import Paragraph from '../../ui/Paragraph';
import ActivityList from './ActivityList';

const ActivityBox = styled.div`
  border-top: 1px solid var(--color-light-accent);
  border-bottom: 1px solid var(--color-light-accent);
  /* background-color: orangered; */
  padding-top: 2rem;
  margin-bottom: 2rem;

  height: 100%;
  overflow: auto;
`;

function RecentActivity({ activities }) {
  if (activities.length === 0)
    return (
      <Empty>
        <Paragraph color="faded">No activities to display</Paragraph>
      </Empty>
    );
  return (
    <ActivityBox>
      {activities.map((activity) => (
        <ActivityList activity={activity} key={activity.id} />
      ))}
    </ActivityBox>
  );
}

export default RecentActivity;
