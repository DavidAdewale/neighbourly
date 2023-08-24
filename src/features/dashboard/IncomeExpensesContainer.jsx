import { css, styled } from 'styled-components';
import Paragraph from '../../ui/Paragraph';
import { formatCurrency } from '../../utilities/helpers';

const Card = styled.div`
  padding: 2rem 2rem;
  border-radius: 1.8rem;
  border: 1px solid var(--color-light-accent);
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-form-input-focus);
    transform: scale(1.04);
    border: 1px solid transparent;
  }
`;

const Revenue = styled.p`
  font-family: 'Space Mono';

  ${({ type }) =>
    type === 'income' &&
    css`
      color: var(--color-main);
    `}

  ${({ type }) =>
    type === 'expenses' &&
    css`
      color: var(--color-danger);
    `}
`;

function IncomeExpensesContainer({ records }) {
  const allIncome = records.filter((record) => record.category === 'income');
  const allExpenses = records.filter(
    (record) => record.category === 'expenses'
  );

  const totalIncome = allIncome.reduce((acc, sum) => (acc += sum.amount), 0);
  const totalExpenses = allExpenses.reduce(
    (acc, sum) => (acc += sum.amount),
    0
  );

  const netIncome = totalIncome - totalExpenses;

  return (
    <>
      <Card>
        <Paragraph size="small">TOTAL INCOME</Paragraph>
        <Revenue type="income">{formatCurrency(totalIncome)}</Revenue>
      </Card>
      <Card>
        <Paragraph size="small">TOTAL EXPENSES</Paragraph>
        <Revenue type="expenses">{formatCurrency(totalExpenses)}</Revenue>
      </Card>
      <Card>
        <Paragraph size="small">NET INCOME</Paragraph>
        <Revenue type={netIncome < 0 ? 'expenses' : 'income'}>
          {formatCurrency(netIncome)}
        </Revenue>
      </Card>
    </>
  );
}

export default IncomeExpensesContainer;
