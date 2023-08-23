import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useProperties } from '../features/properties/useProperties';
import AppPage from '../ui/AppPage';
import AppPageTitle from '../ui/AppPageTitle';
import { OperationPanel } from '../ui/OperationPanel';
import { OperationsTab } from '../ui/OperationsTab';
import { SearchBar } from './SearchBar';
import FullPageSpinner from '../ui/FullPageSpinner';
import FinancesHome from '../features/finances/FinancesHome';
import { useState } from 'react';

function Finances() {
  const { properties, isLoading } = useProperties();
  const [search, setSearch] = useState('');

  if (isLoading) return <FullPageSpinner />;

  function handleSearch(e) {
    const results = properties.filter((property) =>
      property.propertyName.toLowerCase().includes(e.toLowerCase())
    );

    setSearch(results);
  }

  const filteredProperties = search === '' ? properties : search;
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
      <FinancesHome properties={filteredProperties} />
    </AppPage>
  );
}

export default Finances;
