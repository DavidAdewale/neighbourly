import { css, styled } from 'styled-components';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { OperationPanel } from '../../ui/OperationPanel';
import { SearchBar } from '../../pages/SearchBar';
import { formatDateDistance } from '../../utilities/helpers';
import TenantViews from './TenantViews';
import { useState } from 'react';
import Filter from '../../ui/Filter';
import { OperationsTab } from '../../ui/OperationsTab';

const LeaseFilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-light-accent);
  color: var(--color-light-accent);
  padding: 1rem 2rem;
  border-radius: 2.5rem;
  cursor: pointer;
  transition: all 0.3s;

  ${({ type }) =>
    type === 'active' &&
    css`
      background-color: var(--color-text);
      color: var(--color-bg);
      border-color: var(--color-text);
    `}

  &:not([type='active']):hover {
    color: var(--color-text);
    border: 1px solid var(--color-text);
  }

  @media only screen and (max-width: 37.5em) {
    padding: 1rem 2rem;
  }
`;

function TenantList({ occupiedApartments, occupiedHouses }) {
  const [search, setSearch] = useState('');
  const [searchKeywords, setSearchKeyword] = useState('');
  const [active, setActive] = useState('all');
  const houses = occupiedHouses.map((house) => {
    return {
      id: house.id,
      propertyName: house.propertyName,
      propertyCategory: house.propertyCategory,
      tenantName: house.tenantName,
      tenantEmail: house.tenantEmail,
      leaseStartDate: house.leaseStartDate,
      leaseExpiryDate: house.leaseExpiryDate,
      expectedRentalIncome: house.expectedRentalIncome,
      actualRentalIncome: house.actualRentalIncome,
    };
  });

  const apartments = occupiedApartments?.flatMap(
    ({ id, propertyName, propertyCategory, apartments }) =>
      apartments?.map(
        ({
          tenantName,
          tenantEmail,
          leaseStartDate,
          leaseExpiryDate,
          actualRentalIncome,
          expectedRentalIncome,
          apartmentNumber,
        }) => ({
          id,
          propertyName,
          propertyCategory,
          apartmentNumber,
          tenantName: tenantName || '',
          tenantEmail: tenantEmail || '',
          leaseStartDate: leaseStartDate || '',
          leaseExpiryDate: leaseExpiryDate || '',
          actualRentalIncome: +actualRentalIncome || 0,
          expectedRentalIncome: +expectedRentalIncome || 0,
        })
      )
  );

  const allRentedProperties = [...houses, ...apartments];
  let propertiesArray;

  const filterExpiredRentals = allRentedProperties.filter((property) => {
    if (!property?.leaseExpiryDate) return false;
    return formatDateDistance(property?.leaseExpiryDate).includes('Exp.');
  });

  const filterShortTermTenants = allRentedProperties.filter((tenant) => {
    if (!tenant?.leaseExpiryDate) return false;
    const leaseDurationString = formatDateDistance(
      tenant?.leaseExpiryDate
    ).toLowerCase();
    const regex = /in (([1-9]|[12]\d|3[01]) days|(1|2|3|4|5|6) months)/;
    return regex.test(leaseDurationString);
  });

  if (active === 'all') {
    propertiesArray = allRentedProperties;
  } else if (active === 'short') {
    propertiesArray = filterShortTermTenants;
  } else if (active === 'exp') {
    propertiesArray = filterExpiredRentals;
  }

  const properties =
    search === ''
      ? propertiesArray.sort((a, b) =>
          a.propertyName.localeCompare(b.propertyName)
        )
      : search;

  function handleSearch(value) {
    setSearchKeyword(value);
    const searchedTenant = propertiesArray
      .filter(
        (property) =>
          property.propertyName.toLowerCase().includes(value.toLowerCase()) ||
          property.tenantName?.toLowerCase().includes(value.toLowerCase()) ||
          property.tenantEmail?.toLowerCase().includes(value.toLowerCase())
      )
      .sort((a, b) => a.propertyName.localeCompare(b.propertyName));
    setSearch(searchedTenant);
  }

  return (
    <>
      <OperationPanel>
        <OperationsTab>
          <SearchBar>
            <HiMagnifyingGlass />
            <input
              type="text"
              id="search"
              placeholder="Search tenant"
              value={searchKeywords}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </SearchBar>
          <Filter
            filterField="type"
            options={[
              { value: 'all', label: 'All' },
              { value: 'house', label: 'Houses' },
              { value: 'apartment-building', label: 'Apartments' },
            ]}
          />
        </OperationsTab>
        <LeaseFilterBox>
          <FilterButton
            type={active === 'all' ? 'active' : ''}
            onClick={() => {
              setSearchKeyword('');
              setSearch('');
              setActive('all');
            }}
          >
            All tenants
          </FilterButton>
          <FilterButton
            type={active === 'short' ? 'active' : ''}
            onClick={() => {
              setSearchKeyword('');
              setSearch(filterShortTermTenants);
              setActive('short');
            }}
          >
            Near Expiry
          </FilterButton>
          <FilterButton
            type={active === 'exp' ? 'active' : ''}
            onClick={() => {
              setSearchKeyword('');
              setSearch(filterExpiredRentals);
              setActive('exp');
            }}
          >
            Lease expired
          </FilterButton>
        </LeaseFilterBox>
      </OperationPanel>
      <TenantViews properties={properties} />
    </>
  );
}

export default TenantList;
