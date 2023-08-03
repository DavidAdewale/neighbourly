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
import { useSearchParams } from 'react-router-dom';

const SearchBar = styled.div`
  display: flex;
  position: relative;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    top: 26%;
    left: 1rem;
    color: var(--color-btn-text-faded);
  }

  & input {
    padding: 1rem 3rem;
    font-family: inherit;
    border-radius: 0.8rem;
    border: 1px solid transparent;
    outline: none;

    background-color: var(--color-form-btn);
    color: var(--color-text);

    transition: all 0.3s;

    &::placeholder {
      color: var(--color-btn-text-faded);
    }

    &:focus {
      padding: 1rem 3.5rem;
      background-color: var(--color-input-focus);
      border: 1px solid var(--color-btn-secondary-hover);
    }
  }
`;

const OperationPanel = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem 0;

  @media only screen and (max-width: 75em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const OperationsTab = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

function Properties() {
  useDocumentTitle('Properties');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedProperty, setSearchedProperty] = useState('');
  const { isLoading, properties } = useProperties();

  if (isLoading) return <FullPageSpinner />;

  function handleSearch(value) {
    const searchedProperties = properties.filter((property) =>
      property.propertyName.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedProperty(searchedProperties);
  }

  function addProperty() {
    searchParams.set('action', 'new');
    setSearchParams(searchParams);
  }

  return (
    <AppPage>
      <AppPageTitle>
        <h3>Properties</h3>
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
        <Button onClick={addProperty}>
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
