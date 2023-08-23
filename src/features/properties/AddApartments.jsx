import { useState } from 'react';
import { ColumnFormRow } from './ColumnFormRow';
import FormRow from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import Button from '../../ui/Button';
import { styled } from 'styled-components';
import { useUpdateProperty } from './useUpdateProperty';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import { ButtonContainer } from '../../ui/ButtonContainer';
import { accumulateIncome } from '../../utilities/helpers';

const StyledRows = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  align-items: center;

  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

function AddApartments({ propertyDetails, id }) {
  const { updateProperty, isUpdating } = useUpdateProperty();
  const navigate = useNavigate();

  const { apartments } = propertyDetails;
  const [newApartments, setNewApartments] = useState([]);
  const apartmentForm = {
    apartmentNumber: '',
    expectedRentalIncome: '',
  };

  const isEmpty =
    newApartments.filter(
      (apartment) =>
        apartment.apartmentNumber === '' ||
        apartment.expectedRentalIncome === ''
    ).length > 0;

  function handleAddApartment() {
    setNewApartments([...newApartments, apartmentForm]);
  }

  function handleDelete(index) {
    const updatedApartments = newApartments.filter((_, i) => i !== index);
    setNewApartments(updatedApartments);
  }

  function handleInputChange(index, field, value) {
    const updatedApartments = [...newApartments];
    updatedApartments[index][field] = value;
    setNewApartments(updatedApartments);
  }

  function handleSubmit() {
    const data = newApartments.map((apartment) => {
      return {
        apartmentNumber: apartment.apartmentNumber,
        actualRentalIncome: 0,
        expectedRentalIncome: apartment.expectedRentalIncome,
        leaseExpiryDate: null,
        leaseStartDate: null,
        occupancyStatus: 'vacant',
        tenantEmail: '',
        tenantName: '',
      };
    });

    const updatedApartments = [...apartments, ...data];

    const newPropertyDetails = {
      totalApartments: updatedApartments.length,
      apartments: updatedApartments,
    };
    const newExpectedIncome = accumulateIncome(
      updatedApartments,
      'expectedRentalIncome'
    );

    const newData = {
      expectedRentalIncome: newExpectedIncome,
      propertyDetails: JSON.stringify(newPropertyDetails),
    };
    updateProperty([newData, id], { onSettled: () => navigate(-1) });
  }
  return (
    <>
      <ColumnFormRow>
        <legend>Add apartments</legend>
        {newApartments.length > 0 &&
          newApartments.map((apartment, index) => (
            <StyledRows key={index}>
              <FormRow label={`Apartment Name`}>
                <FormInput
                  value={apartment.apartmentNumber}
                  id="apartmentNumber"
                  type="text"
                  onChange={(e) =>
                    handleInputChange(index, 'apartmentNumber', e.target.value)
                  }
                />
              </FormRow>
              <FormRow label={`Rent`} key={`expectedRent-${index}`}>
                <FormInput
                  value={apartment.expectedRentalIncome}
                  id="expectedRentalIncome"
                  type="number"
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      'expectedRentalIncome',
                      e.target.value
                    )
                  }
                />
              </FormRow>
              <Button
                type="button"
                variation="reset"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </StyledRows>
          ))}
      </ColumnFormRow>
      <ButtonContainer>
        <Button
          type="button"
          variation="formSecondary"
          onClick={handleAddApartment}
        >
          Add apartment
        </Button>
        {newApartments.length > 0 && (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isEmpty || isUpdating}
          >
            {isUpdating && <Spinner />}Submit
          </Button>
        )}
      </ButtonContainer>
    </>
  );
}

export default AddApartments;
