import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import Select from '../../../ui/Select';
import { ColumnFormRow } from '../ColumnFormRow';

function BasicInformation({ actions, property }) {
  const { tenantName, tenantEmail, occupancyStatus } = property;
  const { state, dispatch } = actions;
  const isOccupied = occupancyStatus === 'occupied';
  const isVacant =
    occupancyStatus === 'vacant' && state.occupancyStatus !== 'occupied';

  return (
    <ColumnFormRow>
      <legend>Basic tenant information</legend>
      {!isVacant && (
        <>
          <FormRow label="Tenant's name">
            <FormInput
              id="tenantName"
              type="text"
              defaultValue={tenantName || ''}
              disabled={isVacant}
              onChange={(e) =>
                dispatch({
                  type: 'field/update',
                  field: 'tenantName',
                  payload: e.target.value,
                })
              }
            />
          </FormRow>
          <FormRow label="Tenant's email">
            <FormInput
              id="tenantEmail"
              type="email"
              defaultValue={tenantEmail || ''}
              disabled={isVacant}
              onChange={(e) =>
                dispatch({
                  type: 'field/update',
                  field: 'tenantEmail',
                  payload: e.target.value,
                })
              }
            />
          </FormRow>
        </>
      )}
      <FormRow label="Occupancy status">
        <Select
          defaultValue={occupancyStatus}
          disabled={isOccupied}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'occupancyStatus',
              payload: e.target.value,
            })
          }
        >
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
        </Select>
      </FormRow>
    </ColumnFormRow>
  );
}

export default BasicInformation;
