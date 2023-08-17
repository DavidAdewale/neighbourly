import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from './useProperties';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import FormBox from '../../ui/FormBox';
import { ColumnFormRow } from './ColumnFormRow';
import FormRow from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import UpdateBasicPropertyInformation from './UpdateBasicPropertyInformation';
import AppPageTitle from '../../ui/AppPageTitle';
import { styled } from 'styled-components';
import UpdateAmenities from './UpdateAmenities';

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
  console.log(property);
  return (
    <AppPage>
      <StyledAppPageTitle>
        <h3>Edit {property.propertyName}</h3>
        <Button
          variation="formSecondary"
          onClick={() => navigate(`/properties/${id}`)}
        >
          Go back
        </Button>
      </StyledAppPageTitle>
      <StyledForms>
        <UpdateBasicPropertyInformation property={property} />
        <UpdateAmenities property={property} />
      </StyledForms>
    </AppPage>
  );
}

export default UpdateProperty;
