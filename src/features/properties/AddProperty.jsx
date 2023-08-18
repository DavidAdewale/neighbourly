import { styled } from 'styled-components';
import { IoChevronBackOutline } from 'react-icons/io5';
import AppPage from '../../ui/AppPage';
import AppPageTitle from '../../ui/AppPageTitle';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import FormBox from '../../ui/FormBox';
import { useReducer } from 'react';
import AddGeneralPropertyInformation from './AddGeneralPropertyInformation';
import AddPropertyAddress from './AddPropertyAddress';
import AddAmenities from './AddAmenities';
import AddPropertyImages from './AddPropertyImages';
import { ButtonContainer } from '../../ui/ButtonContainer';
import { useUser } from '../authentication/useUser';
import { useAddProperty } from './useAddProperty';
import Spinner from '../../ui/Spinner';

const StyledAppPageTitle = styled(AppPageTitle)`
  margin-bottom: 3rem;
`;

const initialState = {
  user_id: '',
  propertyName: '',
  propertyType: 'residential',
  propertyCategory: 'apartment-building',
  expectedRentalIncome: null,
  actualRentalIncome: null,
  occupancyStatus: 'vacant',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  amenities: [],
  propertyImage: [],
  tenantName: null,
  tenantEmail: null,
  paymentStatus: null,
  leaseStartDate: null,
  leaseExpiryDate: null,
  propertyDetails: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'field/update':
      return { ...state, [action.field]: action.payload };

    default:
      return state;
  }
}

function AddProperty() {
  const navigate = useNavigate();
  const { addProperty, isAdding } = useAddProperty();
  const { user } = useUser();
  const userId = user.id;
  const [state, dispatch] = useReducer(formReducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...state, user_id: userId };
    addProperty(data);
  }
  return (
    <AppPage>
      <StyledAppPageTitle>
        <h3>Add new Property</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <IoChevronBackOutline /> Back
        </Button>
      </StyledAppPageTitle>
      <FormBox onSubmit={handleSubmit}>
        <AddGeneralPropertyInformation state={state} dispatch={dispatch} />
        <AddPropertyAddress state={state} dispatch={dispatch} />
        <AddAmenities state={state} dispatch={dispatch} />
        <AddPropertyImages state={state} dispatch={dispatch} />
        <ButtonContainer>
          <Button disabled={isAdding}>
            {isAdding && <Spinner />}Add property
          </Button>
        </ButtonContainer>
      </FormBox>
    </AppPage>
  );
}

export default AddProperty;
