import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../properties/useProperties';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import AppPageTitle from '../../ui/AppPageTitle';
import Button from '../../ui/Button';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { useFinances } from './useFinances';
import FinanceOperations from './FinanceOperations';
import FinanceInformation from './FinanceInformation';

function PropertyFinance() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties();
  const { records, isLoadingRecords } = useFinances(+propertyId);

  if (isLoading || isLoadingRecords) return <FullPageSpinner />;
  const property = properties
    .filter((property) => property.id === +propertyId)
    .at(0);

  const { propertyName } = property;

  return (
    <AppPage>
      <AppPageTitle>
        <h3>{propertyName}</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <HiOutlineChevronLeft /> Back
        </Button>
      </AppPageTitle>
      <FinanceOperations property={property} records={records} />
      <FinanceInformation records={records} />
    </AppPage>
  );
}

export default PropertyFinance;
