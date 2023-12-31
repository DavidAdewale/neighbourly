import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import { formatDateDistance } from '../../../utilities/helpers';
import { ColumnFormRow } from '../ColumnFormRow';

function RentInformation({ actions, property }) {
  const {
    expectedRentalIncome,
    actualRentalIncome,
    leaseExpiryDate,
    occupancyStatus,
  } = property;

  const { state, dispatch } = actions;

  const isExpired = formatDateDistance(leaseExpiryDate).includes('Exp.');

  const isVacant =
    occupancyStatus === 'vacant' && state.occupancyStatus !== 'occupied';

  if (isVacant) return;
  return (
    <ColumnFormRow>
      <legend>Rent Information</legend>
      <FormRow label="Rent amount">
        <FormInput
          id="expectedRentalIncome"
          type="number"
          defaultValue={expectedRentalIncome || 0}
          disabled={true}
        />
      </FormRow>
      <FormRow label="Amount paid">
        <FormInput
          id="actualRentalIncome"
          type="number"
          defaultValue={isExpired ? 0 : actualRentalIncome || 0}
          max={expectedRentalIncome}
          onChange={(e) =>
            dispatch({
              type: 'field/update',
              field: 'actualRentalIncome',
              payload: +e.target.value,
            })
          }
          disabled={!isExpired && actualRentalIncome > 0}
        />
      </FormRow>
    </ColumnFormRow>
  );
}

export default RentInformation;
