import { useNavigate, useParams } from 'react-router-dom';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { useProperties } from '../useProperties';
import AppPage from '../../../ui/AppPage';
import AppPageTitle from '../../../ui/AppPageTitle';
import Button from '../../../ui/Button';
import { IoChevronBackOutline } from 'react-icons/io5';
import DetailsForm from './DetailsForm';
import FullPageSpinner from '../../../ui/FullPageSpinner';

function EditApartment() {
  useScrollToTop();
  const { propertyId, apartmentName } = useParams();
  const { properties, isLoading } = useProperties();

  const navigate = useNavigate();

  if (isLoading) return <FullPageSpinner />;

  const property = properties
    ?.filter((property) => property.id === +propertyId)
    .at(0);
  const propertyDetails = property?.propertyDetails;

  const apartment = propertyDetails?.apartments
    ?.filter((apartment) => apartment.apartmentNumber === apartmentName)
    .at(0);

  const otherApartments = propertyDetails.apartments.filter(
    (apartment) => apartment.apartmentNumber !== apartmentName
  );

  const allDetails = { property, propertyDetails, apartment, otherApartments };
  return (
    <AppPage>
      <AppPageTitle>
        <h3>Edit Apartment {apartmentName}</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <IoChevronBackOutline /> Back
        </Button>
      </AppPageTitle>
      <DetailsForm details={allDetails} />
    </AppPage>
  );
}

export default EditApartment;
