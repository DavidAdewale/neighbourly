import { useState } from 'react';
import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import Select from '../../../ui/Select';
import { ColumnFormRow } from '../ColumnFormRow';

function ApartmentDetailForm({ actions, apartment }) {
  const { dispatch } = actions;
  const { apartmentNumber, occupancyStatus } = apartment;
  const [newTenant, setNewTenant] = useState(false);

  const isOccupied = occupancyStatus === 'occupied';

  function handleNewTenant(e) {
    setNewTenant(!newTenant);

    if (!newTenant) {
      dispatch({
        type: 'field/update',
        field: 'occupancyStatus',
        payload: e.target.value,
      });
    }
    if (newTenant) {
      dispatch({
        type: 'field/update',
        field: 'occupancyStatus',
        payload: null,
      });
    }
  }

  return (
    <ColumnFormRow>
      <legend>Edit apartment details</legend>
      <FormRow label="Apartment Number">
        <FormInput
          id="apartmentNumber"
          type="text"
          defaultValue={apartmentNumber}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'apartmentNumber',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="Occupancy Status">
        <Select
          id="occupancyStatus"
          defaultValue={occupancyStatus}
          disabled={isOccupied}
          onChange={(e) => handleNewTenant(e)}
        >
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
        </Select>
      </FormRow>
    </ColumnFormRow>
  );
}

export default ApartmentDetailForm;
