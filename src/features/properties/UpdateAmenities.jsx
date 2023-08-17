import { useState } from 'react';
import { ColumnFormRow } from './ColumnFormRow';
import FormRow from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import { capitalizeFirstLetter } from '../../utilities/helpers';
import Button from '../../ui/Button';
import FormBox from '../../ui/FormBox';
import { useUpdateProperty } from './useUpdateProperty';
import Spinner from '../../ui/Spinner';

function UpdateAmenities({ property }) {
  const { id, amenities } = property;
  const { updateProperty, isUpdating } = useUpdateProperty();
  const [updatedAmenities, setUpdatedAmenities] = useState(
    [...amenities] || []
  );

  const update = updatedAmenities.filter((amenity) => amenity !== '');
  const isNotUpdated = JSON.stringify(amenities) === JSON.stringify(update);

  function handleAmentiesChange(e) {
    const updatedAmenitiesCopy = [...updatedAmenities];
    updatedAmenitiesCopy[e.target.id] = e.target.value;
    setUpdatedAmenities(updatedAmenitiesCopy);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isNotUpdated) {
      setUpdatedAmenities([...amenities]);
      return;
    }
    const data = { amenities: update };
    updateProperty([data, id]);
  }
  return (
    <FormBox onSubmit={handleSubmit}>
      <ColumnFormRow>
        <legend>Amenities</legend>
        {updatedAmenities.map((amenity, index) => (
          <FormRow key={index}>
            <FormInput
              value={capitalizeFirstLetter(amenity)}
              id={index}
              onChange={handleAmentiesChange}
            />
          </FormRow>
        ))}
        <Button
          variation="secondary"
          type="button"
          onClick={() => setUpdatedAmenities([...updatedAmenities, ''])}
        >
          Add amenity
        </Button>
      </ColumnFormRow>
      <div>
        <Button disabled={isNotUpdated || isUpdating}>
          {isUpdating && <Spinner />} Save
        </Button>
      </div>
    </FormBox>
  );
}

export default UpdateAmenities;
