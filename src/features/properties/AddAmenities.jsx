import { useState } from 'react';
import { ColumnFormRow } from './ColumnFormRow';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import { capitalizeFirstLetter } from '../../utilities/helpers';
import { HiOutlineTrash } from 'react-icons/hi2';
import { styled } from 'styled-components';
import { ButtonContainer } from '../../ui/ButtonContainer';

const FormDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function AddAmenities({ dispatch }) {
  const [amenities, setAmenities] = useState([]);

  function handleAddAmenity() {
    setAmenities([...amenities, '']);
  }

  function handleChange(e, index) {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = e;
    setAmenities(updatedAmenities);
    dispatch({
      type: 'field/update',
      field: 'amenities',
      payload: updatedAmenities,
    });
  }

  function handleDelete(index) {
    const updatedAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(updatedAmenities);
    dispatch({
      type: 'field/update',
      field: 'amenities',
      payload: updatedAmenities,
    });
  }
  return (
    <>
      <ColumnFormRow>
        <legend>Add amenities</legend>
        {amenities.map((amenity, index) => (
          <FormDiv key={index}>
            <FormRow label={`Amenity ${index + 1}`}>
              <FormInput
                id={`Amenity-${index}`}
                type="text"
                value={capitalizeFirstLetter(amenity)}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            </FormRow>
            <Button
              variation="reset"
              type="button"
              onClick={() => handleDelete(index)}
            >
              <HiOutlineTrash />
            </Button>
          </FormDiv>
        ))}
      </ColumnFormRow>
      <ButtonContainer>
        <Button type="button" variation="secondary" onClick={handleAddAmenity}>
          Add amenity
        </Button>
      </ButtonContainer>
    </>
  );
}

export default AddAmenities;
