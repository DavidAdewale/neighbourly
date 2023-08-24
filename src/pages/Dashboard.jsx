import { useProperties } from '../features/properties/useProperties';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import AppPage from '../ui/AppPage';
import AppPageTitle from '../ui/AppPageTitle';
import FullPageSpinner from '../ui/FullPageSpinner';
import DashboardHome from '../features/dashboard/DashboardHome';

function Dashboard() {
  useDocumentTitle('Dashboard');
  const { properties, isLoading } = useProperties();

  if (isLoading) return <FullPageSpinner />;

  return (
    <AppPage>
      <AppPageTitle>
        <h3>Dashboard</h3>
      </AppPageTitle>
      <DashboardHome properties={properties} />
    </AppPage>
  );
}

export default Dashboard;
