import { styled } from 'styled-components';
import Paragraph from '../../ui/Paragraph';
import TableList from './TableList';

const FinanceTable = styled.div`
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  max-width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TableHeader = styled.div`
  display: grid;
  width: 100%;
  border: 1px solid var(--color-light-accent);
  grid-template-columns: repeat(2, minmax(1rem, 1fr)) 2fr 4fr;
  grid-column-gap: 2rem;
  background-color: var(--color-card-bg);
  border-radius: 0.5rem;

  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    padding: 0.4rem 1rem;
    border-left: 1px solid var(--color-light-accent);

    &:first-of-type {
      border-left: none;
    }
  }

  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;

function FinanceInformation({ records }) {
  return (
    <FinanceTable>
      <TableContainer>
        <TableHeader>
          <Paragraph color="faded" size="small">
            Type
          </Paragraph>
          <Paragraph color="faded" size="small">
            Date
          </Paragraph>
          <Paragraph color="faded" size="small">
            Amount
          </Paragraph>
          <Paragraph color="faded" size="small">
            Description
          </Paragraph>
        </TableHeader>
        {records.map((record) => (
          <TableList record={record} key={record.id} />
        ))}
      </TableContainer>
    </FinanceTable>
  );
}

export default FinanceInformation;
