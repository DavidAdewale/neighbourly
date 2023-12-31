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
              {
                value: 'transactionDate-desc',
                label: 'Sort by date (earlier first)',
              },
              {
                value: 'transactionDate-asc',
                label: 'Sort by date (earlier last)',
              },
              {
                value: 'amount-desc',
                label: 'Sort by amount (high first)',
              },
              {
                value: 'amount-asc',
                label: 'Sort by amount (low first)',
              },
            ]}
          />
          <Filter
            filterField="timeInterval"
            options={[
              { value: 'currentYear', label: 'This year' },
              { value: 'pastQuarter', label: 'Past quater' },
              { value: 'past6Months', label: 'Past 6 months' },
              { value: 'pastTwoYears', label: 'Last 2 years' },
              { value: 'pastFiveYears', label: 'Last 5 years' },
              { value: 'all', label: 'All' },
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
