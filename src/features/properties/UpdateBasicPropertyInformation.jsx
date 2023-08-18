import { useState } from 'react';
import Button from '../../ui/Button';
import FormBox from '../../ui/FormBox';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import { ColumnFormRow } from './ColumnFormRow';
import { useUpdateProperty } from './useUpdateProperty';
import Spinner from '../../ui/Spinner';
// import { capitalizeFirstLetter } from '../../utilities/helpers';

function UpdateBasicPropertyInformation({ property }) {
  const { id, propertyName, address, city, state, amenities } = property;
  const { updateProperty, isUpdating } = useUpdateProperty();
  const [name, setName] = useState(propertyName || '');
  const [newAddress, setNewAddress] = useState(address || '');
  const [cityName, setCityName] = useState(city || '');
  const [stateName, setStateName] = useState(state || '');

  const formerData = {
    propertyName: propertyName || '',
    address: address || '',
    city: city || '',
    state: state || '',
  };

  const newData = {
    propertyName: name,
    address: newAddress,
    city: cityName,
    state: stateName,
  };

  const isNotChanged = JSON.stringify(formerData) === JSON.stringify(newData);

  function handleSubmit(e) {
    e.preventDefault();

    if (isNotChanged) return;

    updateProperty([newData, id]);
  }

  return (
    <FormBox onSubmit={handleSubmit}>
      <ColumnFormRow>
        <legend>Basic Property Information</legend>
        <FormRow label="Property Name">
          <FormInput
            value={name}
            id="propertyName"
            onChange={(e) => setName(e.target.value)}
          />
        </FormRow>
        <FormRow label="Address">
          <FormInput
            value={newAddress}
            id="address"
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </FormRow>
        <FormRow label="City">
          <FormInput
            value={cityName}
            id="city"
            onChange={(e) => setCityName(e.target.value)}
          />
        </FormRow>
        <FormRow label="State">
          <FormInput
            value={stateName}
            id="state"
            onChange={(e) => setStateName(e.target.value)}
          />
        </FormRow>
      </ColumnFormRow>

      <div>
        <Button type="submit" disabled={isUpdating || isNotChanged}>
          {isUpdating && <Spinner />} Save
        </Button>
      </div>
    </FormBox>
  );
}

export default UpdateBasicPropertyInformation;
