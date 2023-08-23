import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import { formatDateDistance } from '../../../utilities/helpers';
import { ColumnFormRow } from '../ColumnFormRow';

function TenantBasicDetails({ actions, apartment }) {
  const { tenantName, tenantEmail, leaseStartDate, leaseExpiryDate } =
    apartment;

  const { state, dispatch } = actions;
  const isLease =
    formatDateDistance(leaseExpiryDate).includes('Exp.') ||
    state.occupancyStatus === 'occupied';

  return (
    <ColumnFormRow>
      <legend>Edit tenant details</legend>
      <FormRow label="Tenant Name">
        <FormInput
          type="text"
          id="tenantName"
          defaultValue={tenantName}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'tenantName',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="Tenant Email">
        <FormInput
          type="text"
          id="tenantEmail"
          defaultValue={tenantEmail}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'tenantEmail',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="Lease start Date">
        <FormInput
          type="date"
          id="leaseStartDate"
          defaultValue={leaseStartDate}
          disabled={!isLease}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'leaseStartDate',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="Lease expiry Date">
        <FormInput
          type="date"
          id="leaseExpiry"
          defaultValue={leaseExpiryDate}
          disabled={!isLease}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'leaseExpiryDate',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
    </ColumnFormRow>
  );
}

export default TenantBasicDetails;
