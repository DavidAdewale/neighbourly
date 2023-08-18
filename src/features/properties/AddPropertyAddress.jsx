import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import { ColumnFormRow } from './ColumnFormRow';

function AddPropertyAddress({ state, dispatch }) {
  return (
    <ColumnFormRow>
      <legend>Property Address</legend>
      <FormRow label="Address">
        <FormInput
          id="address"
          type="text"
          value={state.address}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'address',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="State">
        <FormInput
          id="state"
          type="text"
          value={state.state}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'state',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="City">
        <FormInput
          id="city"
          type="text"
          value={state.city}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'city',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
    </ColumnFormRow>
  );
}

export default AddPropertyAddress;
