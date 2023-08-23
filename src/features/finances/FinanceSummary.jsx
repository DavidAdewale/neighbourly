import { css, styled } from 'styled-components';
import { formatCurrency } from '../../utilities/helpers';

const SummaryContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Blocks = styled.div`
  display: flex;
  gap: 2rem;

  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
`;

const Block = styled.div`
  text-align: center;
  padding: 1rem 2rem;

  & p {
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }

  & h5 {
    font-family: 'Space Mono';
    font-size: 1.6rem;
  }

  ${({ type }) =>
    type === 'income' &&
    css`
      & h5 {
        color: var(--color-main);
      }
    `}

  ${({ type }) =>
    type === 'expense' &&
    css`
      & h5 {
        color: var(--color-danger);
      }
    `}
`;

function FinanceSummary({ records }) {
  const totalIncome = records
    .filter((record) => record.category === 'income')
    .reduce((acc, cur) => (acc += cur.amount), 0);

  const totalExpense = records
    .filter((record) => record.category === 'expenses')
    .reduce((acc, cur) => (acc += cur.amount), 0);

  const netIncome = totalIncome - totalExpense;

  return (
    <SummaryContainer>
      <Blocks>
        <Block type="income">
          <p>Total income</p>
          <h5>{formatCurrency(totalIncome)}</h5>
        </Block>
        <Block type="expense">
          <p> Total expenses</p>
          <h5>{formatCurrency(totalExpense)}</h5>
        </Block>
        <Block type={totalIncome > totalExpense ? 'income' : 'expense'}>
          <p>Net income</p>
          <h5>{formatCurrency(netIncome)}</h5>
        </Block>
      </Blocks>
    </SummaryContainer>
  );
}

export default FinanceSummary;
