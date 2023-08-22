import { HiChevronLeft } from 'react-icons/hi2';
import AppPage from '../../ui/AppPage';
import AppPageTitle from '../../ui/AppPageTitle';
import Button from '../../ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../properties/useProperties';
import { useFinances } from './useFinances';
import FullPageSpinner from '../../ui/FullPageSpinner';
import EditForm from './EditForm';

function EditTransaction() {
  const navigate = useNavigate();
  const { propertyId, entryId } = useParams();
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
        <h3>Edit transaction </h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <HiChevronLeft /> Back
        </Button>
      </AppPageTitle>
      <EditForm record={financeRecord} />
    </AppPage>
  );
}

export default EditTransaction;
