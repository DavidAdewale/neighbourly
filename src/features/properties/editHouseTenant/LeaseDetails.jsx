import { formatDateDistance } from '../../../utilities/helpers';
import { ColumnFormRow } from '../ColumnFormRow';
import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';

function LeaseDetails({ dispatch, property }) {
  const { leaseStartDate, leaseExpiryDate } = property;

  const leaseExpDate = formatDateDistance(leaseExpiryDate).includes('Exp.')
    ? null
    : leaseExpiryDate;

  const leaseStart = formatDateDistance(leaseExpiryDate).includes('Exp.')
    ? null
    : leaseStartDate;

  const isExpired = formatDateDistance(leaseExpiryDate).includes('Exp.');

  return (
    <ColumnFormRow>
      <legend>Lease details</legend>
      <FormRow label="Lease start date">
        <FormInput
          id="leaseStartDate"
          type="date"
          disabled={!isExpired}
          defaultValue={leaseStart || null}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'leaseStartDate',
              payload: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow label="Lease expiry date">
        <FormInput
          id="leaseExpiryDate"
          type="date"
          disabled={!isExpired}
          defaultValue={leaseExpDate || null}
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

export default LeaseDetails;
