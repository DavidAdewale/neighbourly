import { HiPlus } from 'react-icons/hi2';
import { OperationPanel } from '../../ui/OperationPanel';
import { OperationsTab } from '../../ui/OperationsTab';
import Button from '../../ui/Button';
import Filter from '../../ui/Filter';
import { useNavigate } from 'react-router-dom';

function FinanceOperations({ property }) {
  const { id } = property;
  const navigate = useNavigate();
  return (
    <>
      <OperationPanel>
        <OperationsTab>
          <Filter
            filterField="category"
            options={[
              { value: 'all', label: 'All' },
              { value: 'income', label: 'Income' },
              { value: 'expenses', label: 'Expenses' },
            ]}
          />
          <Filter
            filterField="sort"
            options={[
              { value: 'created_at-asc', label: 'Latest - Earliest' },
              { value: 'created_at-desc', label: 'Earliest - Latest' },
            ]}
          />
        </OperationsTab>
        <Button onClick={() => navigate(`/finances/${id}/add`)}>
          <HiPlus /> Add Entry
        </Button>
      </OperationPanel>
    </>
  );
}

export default FinanceOperations;
