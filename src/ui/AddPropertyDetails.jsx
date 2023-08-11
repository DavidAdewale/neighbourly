import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { ColumnFormRow } from '../features/properties/ColumnFormRow';
import { useUpdateProperty } from '../features/properties/useUpdateProperty';
import {
  accumulateIncome,
  checkPropertyStatus,
  updateSequence,
} from '../utilities/helpers';

import AppPage from './AppPage';
import FormBox from './FormBox';
import FormRow from './FormRow';
import FormInput from './FormInput';
import Button from './Button';
import Select from './Select';
import Spinner from './Spinner';

const PageTitle = styled.h3`
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
  const [numApartments, setNumApartments] = useState(1);
  const [apartmentsData, setApartmentsData] = useState([]);

  const navigate = useNavigate();

  const { updateProperty, isUpdating } = useUpdateProperty();
  const propertyId = +useParams().propertyId;

  const handleNumApartmentsChange = (e) => {
    const num = e.target.value === '' ? 1 : parseInt(e.target.value);
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

    const propertyUpdate = {
      totalApartments: newData.length,
      apartments: newData,
    };

    const propertyDetailsJSON = JSON.stringify(propertyUpdate);
    // const propertyDetails = 'propertyDetails';
    // const expectedRentalIncome = 'expectedRentalIncome';
    // const actualRentalIncome = 'actualRentalIncome';
    // const occupancyStatus = 'occupancyStatus';

    const totalRentalIncome = accumulateIncome(newData, 'expectedRentalIncome');
    const totalActualRentalIncome = accumulateIncome(
      newData,
      'actualRentalIncome'
    );

    const propertyStatus = checkPropertyStatus(newData);
    const sequence = [
      ['expectedRentalIncome', totalRentalIncome, propertyId],
      ['actualRentalIncome', totalActualRentalIncome, propertyId],
      ['occupancyStatus', propertyStatus, propertyId],
      ['propertyDetails', propertyDetailsJSON, propertyId],
    ];

    updateSequence(
      updateProperty,
      sequence,
      toast.success('Property successfully added'),
      navigate(`/properties/${propertyId}`)
    );

    // updateProperty([expectedRentalIncome, totalRentalIncome, propertyId]);
    // updateProperty([actualRentalIncome, totalActualRentalIncome, propertyId]);
    // updateProperty([occupancyStatus, propertyStatus, propertyId]);
    // updateProperty([propertyDetails, propertyDetailsJSON, propertyId], {
    //   onSuccess: () => {
    //     navigate(`/properties/${propertyId}`);
    //     toast.success('Property successfully added');
    //   },
    // });
  }

  const handleApartmentDataChange = (index, field, value) => {
    const updatedApartmentsData = [...apartmentsData];
    updatedApartmentsData[index][field] = value;
    setApartmentsData(updatedApartmentsData);
  };

  return (
    <AppPage>
      <PageTitle>Property Details</PageTitle>
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
              <FormRow label="Amenities">
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
              </FormRow>
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
        <Button type="submit" variation="submit" disabled={isUpdating}>
          {isUpdating && <Spinner />} Submit
        </Button>
      </StyledFormBox>
    </AppPage>
  );
}

export default AddPropertyDetails;
