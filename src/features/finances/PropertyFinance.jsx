import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useProperties } from '../properties/useProperties';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import AppPageTitle from '../../ui/AppPageTitle';
import Button from '../../ui/Button';
import { HiMagnifyingGlass, HiOutlineChevronLeft } from 'react-icons/hi2';
import { useFinances } from './useFinances';
import FinanceOperations from './FinanceOperations';
import FinanceInformation from './FinanceInformation';
import { SearchBar } from '../../pages/SearchBar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import FinanceSummary from './FinanceSummary';

const Search = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

function PropertyFinance() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const { records, isLoadingRecords } = useFinances(+propertyId);

  const [search, setSearch] = useState('');

  if (isLoading || isLoadingRecords) return <FullPageSpinner />;
  const property = properties
    .filter((property) => property.id === +propertyId)
    .at(0);

  const { propertyName } = property;

  const isEmpty = records.length === 0;

  function handleSearch(value) {
    const searchedRecord = records.filter((record) =>
      record.description.toLowerCase().includes(value.toLowerCase())
    );

    setSearch(searchedRecord);
  }

  const financeRecord = search === '' ? records : search;

  return (
    <AppPage>
      <AppPageTitle>
        <h3>{propertyName}</h3>
        <Button variation="secondary" onClick={() => navigate('/finances')}>
          <HiOutlineChevronLeft /> Back
        </Button>
      </AppPageTitle>
      <FinanceOperations property={property} records={records} />
      {!isEmpty && (
        <Search>
          <SearchBar>
            <HiMagnifyingGlass />
            <input
              type="text"
              id="search"
              placeholder="Search record"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </SearchBar>
        </Search>
      )}
      <FinanceInformation records={financeRecord} />
      {financeRecord.length > 0 && <FinanceSummary records={financeRecord} />}
    </AppPage>
  );
}

export default PropertyFinance;
