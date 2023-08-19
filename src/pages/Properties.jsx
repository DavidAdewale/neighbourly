import { styled } from 'styled-components';
import { HiMagnifyingGlass, HiPlus } from 'react-icons/hi2';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProperties } from '../features/properties/useProperties';

import AppPage from '../ui/AppPage';
import AppPageTitle from '../ui/AppPageTitle';
import Button from '../ui/Button';
import PropertiesDisplay from '../features/properties/PropertiesDisplay';
import FullPageSpinner from '../ui/FullPageSpinner';
import Filter from '../ui/Filter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';
import Paragraph from '../ui/Paragraph';
import { SearchBar } from './SearchBar';
import { OperationPanel } from '../ui/OperationPanel';

const OperationsTab = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Heading = styled.div`
  display: flex;
  gap: 1rem;
`;

function Properties() {
  useDocumentTitle('Properties');
  useScrollToTop();

  const navigate = useNavigate();
  const [searchedProperty, setSearchedProperty] = useState('');
  const { isLoading, properties } = useProperties();

  if (isLoading) return <FullPageSpinner />;
  const numProperties = properties.length;

  function handleSearch(value) {
    const searchedProperties = properties.filter((property) =>
      property.propertyName.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedProperty(searchedProperties);
  }

  return (
    <AppPage>
      <AppPageTitle>
        <Heading>
          <h3>Properties</h3>
          <Paragraph>({numProperties})</Paragraph>
        </Heading>
      </AppPageTitle>
      <OperationPanel>
        <OperationsTab>
          <SearchBar>
            <HiMagnifyingGlass />
            <input
              type="text"
              id="search"
              placeholder="Search properties"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </SearchBar>
          <Filter
            filterField="status"
            options={[
              { value: 'all', label: 'All' },
              { value: 'occupied', label: 'Occupied' },
              { value: 'partially-occupied', label: 'Partially-occupied' },
              { value: 'vacant', label: 'Vacant' },
            ]}
          />
          <Filter
            filterField="type"
            options={[
              { value: 'all', label: 'All' },
              { value: 'house', label: 'Houses' },
              { value: 'apartment-building', label: 'Apartments' },
            ]}
          />
          <Filter
            filterField="sortBy"
            options={[
              {
                value: 'expectedRentalIncome-asc',
                label: 'Rental Income (Low to High)',
              },
              {
                value: 'expectedRentalIncome-dsc',
                label: 'Rental Income (High to Low)',
              },
            ]}
          />
        </OperationsTab>
        <Button onClick={() => navigate('/properties/add')}>
          Add new Property <HiPlus />{' '}
        </Button>
      </OperationPanel>
      <PropertiesDisplay
        properties={searchedProperty === '' ? properties : searchedProperty}
      />
    </AppPage>
  );
}

export default Properties;
