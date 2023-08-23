import { styled } from 'styled-components';
import Paragraph from '../../ui/Paragraph';
import TableList from './TableList';
import { Empty } from '../../ui/Empty';
import { PiWarningThin } from 'react-icons/pi';
import Pagination from '../../ui/Pagination';
import { useFinances } from './useFinances';
import { useParams } from 'react-router-dom';

const FinanceTable = styled.div`
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  width: 70rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 56.25em) {
    max-width: 50rem;
  }
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
  const { propertyId } = useParams();
  const { isLoadingRecords, count } = useFinances(+propertyId);
  if (isLoadingRecords) return;
  if (records.length === 0)
    return (
      <Empty>
        <PiWarningThin />
        <Paragraph color="faded">No data entry to display</Paragraph>
      </Empty>
    );
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
        <Pagination count={count} />
      </TableContainer>
    </FinanceTable>
  );
}

export default FinanceInformation;
