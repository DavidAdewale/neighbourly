import { styled } from 'styled-components';
import { HiMagnifyingGlass, HiPlus } from 'react-icons/hi2';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProperties } from '../features/properties/useProperties';

import AppPage from '../ui/AppPage';
import AppPageTitle from '../ui/AppPageTitle';
import Button from '../ui/Button';
import PropertiesDisplay from '../features/properties/PropertiesDisplay';
import FullPageSpinner from '../ui/FullPageSpinner';

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

const Select = styled.select`
  padding: 1rem 1.8rem;
  font-family: inherit;
  border: none;
  border-radius: 0.8rem;

  background-color: var(--color-form-btn);
  color: var(--color-text);

  transition: all 0.3s;

  &:focus {
    /* padding: 1rem 2rem; */
    outline: 1.5px solid var(--color-light-accent);
    background-color: var(--color-input-focus);
    color: var(--color-text);
  }

  & option {
    background-color: var(--color-bg);
    color: var(--color-text);
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
  const { isLoading, properties } = useProperties();

  if (isLoading) return <FullPageSpinner />;

  return (
    <AppPage>
      <AppPageTitle>
        <h3>Properties</h3>
      </AppPageTitle>
      <OperationPanel>
        <OperationsTab>
          <SearchBar>
            <HiMagnifyingGlass />
            <input type="text" id="search" placeholder="Search properties" />
          </SearchBar>
          <Select>
            <option value="occupied">Occupied</option>
            <option value="partially-occupied">Partially-occupied</option>
            <option value="vacant">Vacant</option>
          </Select>
          <Select>
            <option value="house">House</option>
            <option value="apartment-building">Apartments</option>
          </Select>
          <Select>
            <option value="rentalIncome-asc">
              Rental Income (Low to High)
            </option>
            <option value="rentalIncome-dsc">
              Rental Income (High to Low)
            </option>
          </Select>
        </OperationsTab>
        <Button>
          Add new Property <HiPlus />{' '}
        </Button>
      </OperationPanel>
      <PropertiesDisplay properties={properties} />
    </AppPage>
  );
}

export default Properties;
