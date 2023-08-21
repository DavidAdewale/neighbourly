import { styled } from 'styled-components';
import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';

const FinanceTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const TableHeader = styled.div`
  display: grid;
  border: 1px solid var(--color-light-accent);
  grid-template-columns: repeat(4, minmax(5rem, 40rem));

  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    padding: 0.4rem 1rem;
    border-left: 1px solid var(--color-light-accent);
    background-color: var(--color-card-bg);

    @media only screen and (max-width: 36.7em) {
      padding: 0.3rem 1rem;
      max-width: 6rem;
    }
  }
`;

const TableList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(5rem, 40rem));
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-card-bg);
  }

  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
    padding: 0.3rem 1rem;

    @media only screen and (max-width: 36.7em) {
      padding: 0.3rem 1rem;
      max-width: 6rem;
    }
  }
`;

function FinanceInformation({ property, records }) {
  console.log(records);
  return (
    <FinanceTable>
      <TableHeader>
        <p>Category</p>
        <p>Date</p>
        <p>Amount</p>
        <p>Description</p>
      </TableHeader>
      {records.map((record) => {
        const { category, transactionDate, amount, description } = record;
        return (
          <TableList key={transactionDate}>
            <p>{capitalizeFirstLetter(category)}</p>
            <p>{transactionDate}</p>
            <p>{formatCurrency(amount)}</p>
            <p>{description}</p>
          </TableList>
        );
      })}
    </FinanceTable>
  );
}

export default FinanceInformation;
