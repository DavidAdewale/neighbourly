import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import { ColumnFormRow } from './ColumnFormRow';

function AddGeneralPropertyInformation({ state, dispatch }) {
  return (
    <ColumnFormRow>
      <legend>general Property information</legend>
      <FormRow label="Property Name">
        <FormInput
          id="propertyName"
          type="text"
          value={state.propertyName}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'propertyName',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="PropertyType">
        <Select
          disabled={true}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'propertyType',
              payload: e.target.value,
            })
          }
        >
          <option value="residential">Residential</option>
        </Select>
      </FormRow>
      <FormRow label="Property Category">
        <Select
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'propertyCategory',
              payload: e.target.value,
            })
          }
        >
          <option value="apartment-building">Apartment Building</option>
          <option value="house">House</option>
        </Select>
      </FormRow>

      {state.propertyCategory === 'house' && (
        <FormRow label="Rent Value">
          <FormInput
            id="expectedRentalIncome"
            type="number"
            value={state.expectedRentalIncome}
            onChange={(e) =>
              dispatch({
                type: 'field/update',
                field: 'expectedRentalIncome',
                payload: +e.target.value,
              })
            }
          />
        </FormRow>
      )}
    </ColumnFormRow>
  );
}

export default AddGeneralPropertyInformation;
