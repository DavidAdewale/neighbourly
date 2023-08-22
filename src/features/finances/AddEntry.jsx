import { useNavigate, useParams } from 'react-router-dom';
import AppPage from '../../ui/AppPage';
import AppPageTitle from '../../ui/AppPageTitle';
import Button from '../../ui/Button';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import EntryForm from './EntryForm';

function AddEntry() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  return (
    <AppPage>
      <AppPageTitle>
        <h3>Add record</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <HiOutlineChevronLeft /> Back
        </Button>
      </AppPageTitle>
      <EntryForm propertyId={+propertyId} />
    </AppPage>
  );
}

export default AddEntry;
