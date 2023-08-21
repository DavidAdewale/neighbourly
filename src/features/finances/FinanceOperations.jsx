import { HiMagnifyingGlass, HiPlus } from 'react-icons/hi2';
import { SearchBar } from '../../pages/SearchBar';
import { OperationPanel } from '../../ui/OperationPanel';
import { OperationsTab } from '../../ui/OperationsTab';
import Button from '../../ui/Button';
import Filter from '../../ui/Filter';

function FinanceOperations({ property }) {
  //   console.log(property);
  return (
    <>
      <OperationPanel>
        <OperationsTab>
          <SearchBar>
            <HiMagnifyingGlass />
            <input type="text" id="search" placeholder="Search record" />
          </SearchBar>
          <Filter
            filterField="category"
            options={[
              { value: 'all', label: 'All' },
              { value: 'income', label: 'Income' },
              { value: 'expenses', label: 'Expenses' },
            ]}
          />
        </OperationsTab>
        <Button>
          <HiPlus /> Add Entry
        </Button>
      </OperationPanel>
    </>
  );
}

export default FinanceOperations;
