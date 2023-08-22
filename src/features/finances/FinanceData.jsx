import { css, styled } from 'styled-components';
import { capitalizeFirstLetter, formatCurrency } from '../../utilities/helpers';
import { HiOutlineCalendarDays } from 'react-icons/hi2';

const Container = styled.div`
  width: 100%;
  padding-top: 4rem;
  display: flex;
  justify-content: center;
`;

const TransactionCard = styled.div`
  width: 50rem;
  /* min-height: 40rem; */
  /* border: 1px solid var(--color-light-accent); */
  border-radius: 2.5rem;
  overflow: hidden;

  background-color: var(--color-card-bg);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

const CardHead = styled.header`
  width: 100%;
  padding: 1.5rem;
  color: var(--color-btn-text);

  display: flex;
  justify-content: center;

  & h5 {
    font-size: 1.4rem;
  }

  ${({ type }) =>
    type === 'income' &&
    css`
      background-color: var(--color-main);
    `}

  ${({ type }) =>
    type === 'expenses' &&
    css`
      background-color: var(--color-btn-reset);
    `}
`;

const CardBody = styled.div`
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  & p {
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
  }
`;

const Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & p {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    color: var(--color-light-accent);
  }

  & h4 {
    font-family: 'Space Mono';
    font-size: 3rem;
  }

  ${({ type }) =>
    type === 'income' &&
    css`
      & h4 {
        color: var(--color-main);
      }
    `}

  ${({ type }) =>
    type === 'expenses' &&
    css`
      & h4 {
        color: var(--color-danger);
      }
    `}

    @media only screen and (max-width: 37.5em) {
    & h4 {
      font-size: 2rem;
    }
  }
`;

const Description = styled.div`
  text-align: center;

  & p {
    text-align: center;
    font-size: 1.2rem;
  }
`;

function FinanceData({ property, record }) {
  const { id, category, transactionDate, amount, description } = record;

  return (
    <Container>
      <TransactionCard>
        <CardHead type={category}>
          <h5>
            Transaction #{id} - {capitalizeFirstLetter(category)}
          </h5>
        </CardHead>
        <CardBody>
          <DateContainer>
            <HiOutlineCalendarDays />
            <p>{new Date(transactionDate).toDateString()}</p>
          </DateContainer>
          <Amount type={category}>
            <p>Amount</p>
            <h4>{formatCurrency(amount)}</h4>
          </Amount>
          <Description>
            <p>{description}</p>
          </Description>
        </CardBody>
      </TransactionCard>
    </Container>
  );
}

export default FinanceData;
