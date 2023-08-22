import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../properties/useProperties';
import { useFinances } from './useFinances';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import AppPageTitle from '../../ui/AppPageTitle';
import Button from '../../ui/Button';
import { HiChevronLeft } from 'react-icons/hi2';
import FinanceData from './FinanceData';
import DataActionButtons from './DataActionButtons';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

function ViewTransaction() {
  const { propertyId, entryId } = useParams();
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties();
  const { records, isLoadingRecords } = useFinances(+propertyId);

  if (isLoading || isLoadingRecords) return <FullPageSpinner />;
  const property = properties
    .filter((property) => property.id === +propertyId)
    .at(0);
  const financeRecord = records
    .filter((record) => record.id === +entryId)
    .at(0);
  return (
    <AppPage>
      <AppPageTitle>
        <h3>Transaction #{entryId}</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <HiChevronLeft /> Back
        </Button>
      </AppPageTitle>
      <Container>
        <FinanceData property={property} record={financeRecord} />
        <DataActionButtons record={financeRecord} />
      </Container>
    </AppPage>
  );
}

export default ViewTransaction;
