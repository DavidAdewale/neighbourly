import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useProperties } from '../features/properties/useProperties';
import AppPage from '../ui/AppPage';
import AppPageTitle from '../ui/AppPageTitle';
import { OperationPanel } from '../ui/OperationPanel';
import { OperationsTab } from '../ui/OperationsTab';
import { SearchBar } from './SearchBar';
import FullPageSpinner from '../ui/FullPageSpinner';
import FinancesHome from '../features/finances/FinancesHome';

function Finances() {
  const { properties, isLoading } = useProperties();
  if (isLoading) return <FullPageSpinner />;

  function handleSearch(e) {
    console.log(e);
  }
  return (
    <AppPage>
      <AppPageTitle>
        <h3>Finances</h3>
      </AppPageTitle>
      <OperationPanel>
        <OperationsTab>
          <SearchBar>
            <HiMagnifyingGlass />
            <input
              type="text"
              id="search"
              placeholder="Search property"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </SearchBar>
        </OperationsTab>
      </OperationPanel>
      <FinancesHome properties={properties} />
    </AppPage>
  );
}

export default Finances;
