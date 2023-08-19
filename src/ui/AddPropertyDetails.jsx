import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ColumnFormRow } from '../features/properties/ColumnFormRow';
import { useUpdateProperty } from '../features/properties/useUpdateProperty';
import { accumulateIncome, checkPropertyStatus } from '../utilities/helpers';

import AppPage from './AppPage';
import FormBox from './FormBox';
import FormRow from './FormRow';
import FormInput from './FormInput';
import Button from './Button';
import Select from './Select';
import Spinner from './Spinner';
// import Heading from './Heading';
import { IoChevronBackOutline } from 'react-icons/io5';
import AppPageTitle from './AppPageTitle';

const StyledAppPageTitle = styled(AppPageTitle)`
  margin-bottom: 3rem;
`;
const StyledFormBox = styled(FormBox)`
  align-items: flex-start;
`;

const FormTopLevel = styled.div`
  display: flex;
  flex-direction: column;
`;

function AddPropertyDetails() {
  const [numApartments, setNumApartments] = useState(0);
  const [apartmentsData, setApartmentsData] = useState([]);
  const { updateProperty, isUpdating } = useUpdateProperty();

  const navigate = useNavigate();

  const propertyId = +useParams().propertyId;
  const isNoApartment = numApartments === 0;

  const handleNumApartmentsChange = (e) => {
    const num = e.target.value === '' ? 0 : parseInt(e.target.value);
    setNumApartments(num);

    setApartmentsData(
      Array.from({ length: num }, () => ({
        apartmentNumber: '',
        occupancyStatus: '',
        expectedRentalIncome: '',
        extraAmenities: [],
        tenantName: '',
        tenantEmail: '',
        paymentStatus: '',
        leaseStartDate: '',
        leaseExpiryDate: '',
        actualRentalIncome: '',
      }))
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newData = apartmentsData.map((apartment) => {
      return {
        ...apartment,
        paymentStatus:
          apartment.actualRentalIncome > 0
            ? apartment.occupancyStatus === 'occupied'
              ? 'paid'
              : 'not-paid'
            : null,
        occupancyStatus:
          apartment.occupancyStatus === 'occupied' ? 'occupied' : 'vacant',
        leaseStartDate:
          apartment.occupancyStatus === '' ||
          apartment.occupancyStatus !== 'occupied'
            ? null
            : apartment.leaseStartDate,
        leaseExpiryDate:
          apartment.occupancyStatus === '' ||
          apartment.occupancyStatus !== 'occupied'
            ? null
            : apartment.leaseExpiryDate,
        tenantName: apartment.tenantName === '' ? null : apartment.tenantName,
        tenantEmail:
          apartment.tenantEmail === '' ? null : apartment.tenantEmail,
        actualRentalIncome:
          apartment.actualRentalIncome === ''
            ? null
            : apartment.actualRentalIncome,
        extraAmenities: apartment.extraAmenities.map((amenity) =>
          amenity.trim()
        ),
      };
    });

    if (newData.length === 0) return;

    const propertyUpdate = {
      totalApartments: newData.length,
      apartments: newData,
    };

    const propertyDetailsJSON = JSON.stringify(propertyUpdate);

    const totalRentalIncome = accumulateIncome(newData, 'expectedRentalIncome');
    const totalActualRentalIncome = accumulateIncome(
      newData,
      'actualRentalIncome'
    );

    const propertyStatus = checkPropertyStatus(newData);

    const data = {
      expectedRentalIncome: totalRentalIncome,
      actualRentalIncome: totalActualRentalIncome,
      occupancyStatus: propertyStatus,
      propertyDetails: propertyDetailsJSON,
    };

    updateProperty([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  const handleApartmentDataChange = (index, field, value) => {
    const updatedApartmentsData = [...apartmentsData];
    updatedApartmentsData[index][field] = value;
    setApartmentsData(updatedApartmentsData);
  };

  return (
    <AppPage>
      <StyledAppPageTitle>
        <h3>Property Details</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <IoChevronBackOutline /> Back
        </Button>
      </StyledAppPageTitle>
      <StyledFormBox onSubmit={handleSubmit}>
        <ColumnFormRow>
          <legend>Apartment Details</legend>
          <FormRow label="Number of apartments">
            <FormInput
              type="number"
              id="totalApartments"
              value={numApartments}
              onChange={handleNumApartmentsChange}
              disabled={isUpdating}
            />
          </FormRow>
        </ColumnFormRow>

        {apartmentsData.map((apartment, index) => (
          <FormTopLevel key={index}>
            <ColumnFormRow>
              <legend>Apartment {index + 1}</legend>
              <FormRow label="Apartment Number">
                <FormInput
                  type="text"
                  id="apartmentNumber"
                  disabled={isUpdating}
                  value={apartment.apartmentNumber}
                  onChange={(e) =>
                    handleApartmentDataChange(
                      index,
                      'apartmentNumber',
                      e.target.value
                    )
                  }
                />
              </FormRow>
              <FormRow label="Rental Cost">
                <FormInput
                  type="number"
                  id="expectedRentalIncome"
                  disabled={isUpdating}
                  value={apartment.expectedRentalIncome}
                  onChange={(e) =>
                    handleApartmentDataChange(
                      index,
                      'expectedRentalIncome',
                      e.target.value
                    )
                  }
                />
              </FormRow>
              {/* <FormRow label="Amenities">
                <FormInput
                  type="text"
                  id="amenities"
                  disabled={isUpdating}
                  value={apartment.extraAmenities}
                  onChange={(e) =>
                    handleApartmentDataChange(
                      index,
                      'extraAmenities',
                      e.target.value.split(',')
                    )
                  }
                />
              </FormRow> */}
              <FormRow label="Occupancy Status">
                <Select
                  id="occupancyStatus"
                  value={apartment.occupancyStatus}
                  disabled={isUpdating}
                  onChange={(e) =>
                    handleApartmentDataChange(
                      index,
                      'occupancyStatus',
                      e.target.value
                    )
                  }
                >
                  <option value="vacant">Vacant</option>
                  <option value="occupied">Occupied</option>
                </Select>
              </FormRow>
              {apartment.occupancyStatus === 'occupied' && (
                <>
                  <FormRow label="Tenant Name">
                    <FormInput
                      type="text"
                      id="tenantName"
                      disabled={isUpdating}
                      value={apartment.tenantName}
                      onChange={(e) =>
                        handleApartmentDataChange(
                          index,
                          'tenantName',
                          e.target.value
                        )
                      }
                    />
                  </FormRow>
                  <FormRow label="Tenant Email">
                    <FormInput
                      type="text"
                      id="tenantEmail"
                      disabled={isUpdating}
                      value={apartment.tenantEmail}
                      onChange={(e) =>
                        handleApartmentDataChange(
                          index,
                          'tenantEmail',
                          e.target.value
                        )
                      }
                    />
                  </FormRow>
                  <FormRow label="Lease Start Date">
                    <FormInput
                      type="date"
                      id="leaseStartDate"
                      disabled={isUpdating}
                      value={apartment.leaseStartDate}
                      onChange={(e) =>
                        handleApartmentDataChange(
                          index,
                          'leaseStartDate',
                          e.target.value
                        )
                      }
                    />
                  </FormRow>
                  <FormRow label="Lease Expiry Date">
                    <FormInput
                      type="date"
                      id="leaseExpiryDate"
                      disabled={isUpdating}
                      value={apartment.leaseExpiryDate}
                      onChange={(e) =>
                        handleApartmentDataChange(
                          index,
                          'leaseExpiryDate',
                          e.target.value
                        )
                      }
                    />
                  </FormRow>
                  <FormRow label="Rent Amount">
                    <FormInput
                      type="number"
                      id="actualRentalIncome"
                      disabled={isUpdating}
                      value={apartment.actualRentalIncome}
                      onChange={(e) =>
                        handleApartmentDataChange(
                          index,
                          'actualRentalIncome',
                          e.target.value
                        )
                      }
                    />
                  </FormRow>
                </>
              )}
            </ColumnFormRow>
          </FormTopLevel>
        ))}
        <Button
          type="submit"
          variation="submit"
          disabled={isUpdating || isNoApartment}
        >
          {isUpdating && <Spinner />} Submit
        </Button>
      </StyledFormBox>
    </AppPage>
  );
}

export default AddPropertyDetails;
