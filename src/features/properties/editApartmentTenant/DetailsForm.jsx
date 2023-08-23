import { styled } from 'styled-components';
import FormBox from '../../../ui/FormBox';
import { useReducer } from 'react';
import { useUpdateProperty } from '../useUpdateProperty';
import ApartmentDetailForm from './ApartmentDetailForm';
import TenantBasicDetails from './TenantBasicDetails';
import RentDetails from './RentDetails';
import FormDataControlPanel from './FormDataControlPanel';
import RentUpdatingPanel from './RentUpdatingPanel';
import { useNavigate } from 'react-router-dom';
import {
  accumulateIncome,
  checkPropertyStatus,
} from '../../../utilities/helpers';
import { useUploadFinance } from '../../finances/useUploadFinance';

const initialState = {
  apartmentNumber: null,
  tenantName: null,
  tenantEmail: null,
  occupancyStatus: null,
  leaseStartDate: null,
  leaseExpiryDate: null,
  expectedRentalIncome: null,
  actualRentalIncome: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'field/update':
      return { ...state, [action.field]: action.payload };

    case 'rent/update':
      return { ...state, expectedRentalIncome: action.payload };

    default:
      return state;
  }
}

const StyledFormBox = styled(FormBox)`
  margin-top: 3rem;
`;

function DetailsForm({ details }) {
  const { updateProperty, isUpdating } = useUpdateProperty();
  const { uploadFinance, isUploading } = useUploadFinance();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { property, propertyDetails, apartment, otherApartments } = details;
  const propertyId = property.id;
  const actions = { state, dispatch };
  const { occupancyStatus } = apartment;

  const isNotUpdated = JSON.stringify(initialState) === JSON.stringify(state);

  function processData() {
    let data;
    if (state.occupancyStatus !== null)
      data = {
        apartmentNumber:
          state.apartmentNumber === null
            ? apartment.apartmentNumber
            : state.apartmentNumber,
        tenantName:
          state.tenantName === null ? apartment.tenantName : state.tenantName,
        tenantEmail:
          state.tenantEmail === null
            ? apartment.tenantEmail
            : state.tenantEmail,
        occupancyStatus:
          state.occupancyStatus === null
            ? apartment.occupancyStatus
            : state.occupancyStatus,
        leaseStartDate:
          state.leaseStartDate === null
            ? apartment.leaseStartDate
            : state.leaseStartDate,
        leaseExpiryDate:
          state.leaseExpiryDate === null
            ? apartment.leaseExpiryDate
            : state.leaseExpiryDate,
        expectedRentalIncome:
          state.expectedRentalIncome === null
            ? +apartment.expectedRentalIncome
            : state.expectedRentalIncome,
        actualRentalIncome:
          state.actualRentalIncome === null
            ? apartment.actualRentalIncome
            : state.actualRentalIncome,
      };

    if (state.occupancyStatus === null && state.actualRentalIncome !== null)
      data = {
        apartmentNumber: apartment.apartmentNumber,

        tenantName: apartment.tenantName,
        tenantEmail: apartment.tenantEmail,
        occupancyStatus: apartment.occupancyStatus,
        leaseStartDate: apartment.leaseStartDate,
        leaseExpiryDate: apartment.leaseExpiryDate,
        expectedRentalIncome:
          state.expectedRentalIncome === null
            ? apartment.expectedRentalIncome
            : state.expectedRentalIncome,
        actualRentalIncome: +state.actualRentalIncome,
      };

    if (
      apartment.occupancyStatus === 'vacant' &&
      apartment.expectedRentalIncome !== state.expectedRentalIncome
    )
      data = {
        apartmentNumber: apartment.apartmentNumber,

        tenantName: apartment.tenantName,
        tenantEmail: apartment.tenantEmail,
        occupancyStatus: apartment.occupancyStatus,
        leaseStartDate: apartment.leaseStartDate,
        leaseExpiryDate: apartment.leaseExpiryDate,
        expectedRentalIncome:
          state.expectedRentalIncome === null
            ? apartment.expectedRentalIncome
            : state.expectedRentalIncome,
        actualRentalIncome: +state.actualRentalIncome,
      };

    console.log(data);

    return data;
  }

  function updateFinanceRecords(figure) {
    const data = {
      property_id: propertyId,
      transactionDate: new Date().toISOString().split('T').at(0),
      description:
        apartment.expectedRentalIncome === apartment.actualRentalIncome + figure
          ? `Rent payment for ${apartment.apartmentNumber} (full)`
          : `Rent payment for ${apartment.apartmentNumber} (${Math.round(
              (figure / apartment.expectedRentalIncome) * 100
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

    const isNotUpdated =
      Object.values(data).filter((value) => value === null).length > 0 &&
      data.expectedRentalIncome === apartment.expectedRentalIncome;

    if (isNotUpdated) {
      alert('Please complete the form');
      return;
    }

    if (
      (data.actualRentalIncome === 0 || data.actualRentalIncome === null) &&
      data.occupancyStatus === 'occupied'
    ) {
      alert('Please enter amount paid');
      return;
    }

    if (apartment.actualRentalIncome !== data.actualRentalIncome) {
      const newPayment = data.actualRentalIncome - apartment.actualRentalIncome;
      if (newPayment === 0) return;
      updateFinanceRecords(newPayment);
    }

    const updatedApartments = [...otherApartments, data];

    const propertyStatus = checkPropertyStatus(updatedApartments);

    const newExpectedIncome = accumulateIncome(
      updatedApartments,
      'expectedRentalIncome'
    );

    const actualRentalIncome = accumulateIncome(
      updatedApartments,
      'actualRentalIncome'
    );

    const newDetails = {
      totalApartments: updatedApartments.length,
      apartments: updatedApartments,
    };

    const dataToUpload = {
      expectedRentalIncome: newExpectedIncome,
      occupancyStatus: propertyStatus,
      actualRentalIncome: actualRentalIncome,
      propertyDetails: JSON.stringify(newDetails),
    };

    updateProperty([dataToUpload, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  function handleRemoveTenant() {
    const data = {
      apartmentNumber: apartment.apartmentNumber,
      tenantName: null,
      tenantEmail: null,
      occupancyStatus: 'vacant',
      leaseStartDate: null,
      leaseExpiryDate: null,
      actualRentalIncome: null,
      expectedRentalIncome: apartment.expectedRentalIncome,
    };
    const updatedApartments = [...otherApartments, data];
    const newExpectedIncome = accumulateIncome(
      updatedApartments,
      'expectedRentalIncome'
    );

    const actualRentalIncome = accumulateIncome(
      updatedApartments,
      'actualRentalIncome'
    );
    const propertyStatus = checkPropertyStatus(updatedApartments);

    const newDetails = {
      totalApartments: updatedApartments.length,
      apartments: updatedApartments,
    };

    const dataToUpload = {
      occupancyStatus: propertyStatus,
      expectedRentalIncome: newExpectedIncome,
      actualRentalIncome: actualRentalIncome,
      propertyDetails: JSON.stringify(newDetails),
    };

    updateProperty([dataToUpload, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }
  return (
    <StyledFormBox onSubmit={handleSubmit}>
      <ApartmentDetailForm actions={actions} apartment={apartment} />
      {(occupancyStatus === 'occupied' ||
        state.occupancyStatus === 'occupied') && (
        <TenantBasicDetails actions={actions} apartment={apartment} />
      )}
      <RentDetails actions={actions} apartment={apartment} />
      <RentUpdatingPanel actions={actions} apartment={apartment} />
      <FormDataControlPanel
        isNotUpdated={isNotUpdated}
        removeTenant={handleRemoveTenant}
        apartment={apartment}
      />
    </StyledFormBox>
  );
}

export default DetailsForm;
