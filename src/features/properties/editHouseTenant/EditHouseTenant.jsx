import { useEffect, useReducer } from 'react';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import AppPage from '../../../ui/AppPage';
import AppPageTitle from '../../../ui/AppPageTitle';
import Button from '../../../ui/Button';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import FormBox from '../../../ui/FormBox';
import { ColumnFormRow } from '../ColumnFormRow';
import { styled } from 'styled-components';
import FormRow from '../../../ui/FormRow';
import FormInput from '../../../ui/FormInput';
import { useProperties } from '../useProperties';
import FullPageSpinner from '../../../ui/FullPageSpinner';
import Modal from '../../../ui/Modal';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Spinner from '../../../ui/Spinner';
import { ButtonContainer } from '../../../ui/ButtonContainer';
import { useUpdateProperty } from '../useUpdateProperty';
import { formatCurrency } from '../../../utilities/helpers';
import BasicInformation from './BasicInformation';
import LeaseDetails from './LeaseDetails';
import RentInformation from './RentInformation';
import UpdateRent from './UpdateRent';
import { useUploadFinance } from '../../finances/useUploadFinance';
import DataControlPanel from './DataControlPanel';

const StyledAppPage = styled(AppPage)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const initialState = {
  tenantName: null,
  tenantEmail: null,
  leaseStartDate: null,
  leaseExpiryDate: null,
  expectedRentalIncome: null,
  actualRentalIncome: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'field/update':
      return {
        ...state,
        [action.field]: action.payload,
      };

    case 'init':
      return { ...state, ...action.payload };

    case 'rent/update':
      return { ...state, expectedRentalIncome: action.payload };

    default:
      return state;
  }
}

function EditHouseTenant() {
  useScrollToTop();
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { updateProperty, isUpdating } = useUpdateProperty();
  const { uploadFinance, isUploading } = useUploadFinance();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { properties, isLoading } = useProperties();
  if (isLoading || isUploading || isUpdating) return <FullPageSpinner />;

  const property = properties
    .filter((property) => property.id === +propertyId)
    .at(0);

  const {
    id,
    tenantName,
    tenantEmail,
    leaseStartDate,
    leaseExpiryDate,
    occupancyStatus,
    expectedRentalIncome,
    actualRentalIncome,
  } = property;

  const propertyDataDiffers =
    tenantName !== initialState.tenantName ||
    tenantEmail !== initialState.tenantEmail ||
    leaseStartDate !== initialState.leaseStartDate ||
    leaseExpiryDate !== initialState.leaseExpiryDate ||
    actualRentalIncome !== initialState.actualRentalIncome;

  const isNotUpdated = JSON.stringify(initialState) === JSON.stringify(state);

  function handleRemoveTenant() {
    const data = {
      tenantName: null,
      tenantEmail: null,
      occupancyStatus: 'vacant',
      leaseStartDate: null,
      leaseExpiryDate: null,
      actualRentalIncome: null,
    };
    updateProperty([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  function processData() {
    const isOcuupied =
      state.actualRentalIncome || actualRentalIncome ? 'occupied' : 'vacant';

    const data = {
      tenantName: state.tenantName === null ? tenantName : state.tenantName,
      tenantEmail: state.tenantEmail === null ? tenantEmail : state.tenantEmail,
      occupancyStatus: isOcuupied,
      leaseStartDate:
        state.leaseStartDate === null ? leaseStartDate : state.leaseStartDate,
      leaseExpiryDate:
        state.leaseExpiryDate === null
          ? leaseExpiryDate
          : state.leaseExpiryDate,
      actualRentalIncome:
        state.actualRentalIncome === null
          ? actualRentalIncome
          : state.actualRentalIncome,
      expectedRentalIncome:
        state.expectedRentalIncome === null
          ? expectedRentalIncome
          : state.expectedRentalIncome,
    };

    return data;
  }

  function updateFinanceRecords(figure) {
    const data = {
      property_id: id,
      transactionDate: new Date().toISOString().split('T').at(0),
      description:
        expectedRentalIncome === actualRentalIncome + figure
          ? 'Rent payment (full)'
          : `Rent payment (${Math.round(
              (figure / expectedRentalIncome) * 100
            )}%) `,
      amount: figure,
      category: 'income',
      isRent: true,
    };
    uploadFinance(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = processData();

    // console.log(data);

    const isNotUpdated =
      Object.values(data).filter((value) => value === null).length > 0 &&
      data.expectedRentalIncome === expectedRentalIncome;

    if (data.expectedRentalIncome !== expectedRentalIncome) {
      const data2 = { expectedRentalIncome: data.expectedRentalIncome };
      updateProperty([data2, propertyId], {
        onSettled: () => navigate(`/properties/${propertyId}`),
      });
    }
    if (isNotUpdated) {
      alert('Please complete the form');
      return;
    }

    if (
      isNotUpdated &&
      (data.actualRentalIncome === 0 || data.actualRentalIncome === null)
    ) {
      alert('Please enter amount paid');
      return;
    }

    if (actualRentalIncome !== data.actualRentalIncome) {
      const newPayment = data.actualRentalIncome - actualRentalIncome;
      updateFinanceRecords(newPayment);
    }

    updateProperty([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  return (
    <StyledAppPage>
      <AppPageTitle>
        <h3>Edit tenant&lsquo;s record</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <HiOutlineChevronLeft /> Back
        </Button>
      </AppPageTitle>
      <FormBox onSubmit={handleSubmit}>
        <BasicInformation
          state={state}
          dispatch={dispatch}
          property={property}
        />
        <LeaseDetails state={state} dispatch={dispatch} property={property} />
        <RentInformation
          state={state}
          dispatch={dispatch}
          property={property}
        />
        <UpdateRent state={state} dispatch={dispatch} property={property} />

        <DataControlPanel
          operations={{
            isUploading,
            isNotUpdated,
            occupancyStatus,
            handleRemoveTenant,
            leaseExpiryDate,
          }}
        />
      </FormBox>
    </StyledAppPage>
  );
}

export default EditHouseTenant;
