import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import { ColumnFormRow } from '../ColumnFormRow';

function BasicInformation({ state, dispatch, property, propertyDiffers }) {
  const { tenantName, tenantEmail } = property;
  return (
    <ColumnFormRow>
      <legend>Basic tenant information</legend>
      <FormRow label="Tenant's name">
        <FormInput
          id="tenantName"
          type="text"
          defaultValue={tenantName || ''}
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
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'tenantEmail',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
    </ColumnFormRow>
  );
}

export default BasicInformation;
