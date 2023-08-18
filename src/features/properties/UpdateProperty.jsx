import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from './useProperties';
import { styled } from 'styled-components';

import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import Button from '../../ui/Button';
import UpdateBasicPropertyInformation from './UpdateBasicPropertyInformation';
import AppPageTitle from '../../ui/AppPageTitle';
import UpdateAmenities from './UpdateAmenities';
import UpdateImages from './UpdateImages';
import { IoChevronBackOutline } from 'react-icons/io5';
import UpdatePropertyDetails from './UpdatePropertyDetails';
import DeleteProperty from './DeleteProperty';

const StyledAppPageTitle = styled(AppPageTitle)`
  margin-bottom: 3rem;
`;

const StyledForms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function UpdateProperty() {
  const id = useParams().propertyId;
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties();
  if (isLoading) return <FullPageSpinner />;
  const property = properties.filter((property) => property.id === +id).at(0);
  const propertyDetails = property.propertyDetails;
  const isApartment =
    propertyDetails !== null && propertyDetails.totalApartments !== 0;

  return (
    <AppPage>
      <StyledAppPageTitle>
        <h3>Edit {property.propertyName}</h3>
        <Button
          variation="secondary"
          onClick={() => navigate(`/properties/${id}`)}
        >
          <IoChevronBackOutline /> Back
        </Button>
      </StyledAppPageTitle>
      <StyledForms>
        <UpdateBasicPropertyInformation property={property} />
        <UpdateAmenities property={property} />
        <UpdateImages property={property} />
        {propertyDetails && isApartment && (
          <UpdatePropertyDetails property={property} />
        )}
        <DeleteProperty id={+id} property={property} />
      </StyledForms>
    </AppPage>
  );
}

export default UpdateProperty;
