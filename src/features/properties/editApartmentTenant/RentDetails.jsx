import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import { formatDateDistance } from '../../../utilities/helpers';
import { ColumnFormRow } from '../ColumnFormRow';

function RentDetails({ actions, apartment }) {
  const {
    expectedRentalIncome,
    actualRentalIncome,
    leaseExpiryDate,
    occupancyStatus,
  } = apartment;

  const { state, dispatch } = actions;

  const isExpired =
    (occupancyStatus === 'occupied' &&
      formatDateDistance(leaseExpiryDate).includes('Exp.')) ||
    state.occupancyStatus === 'occupied';

  // console.log(isExpired);

  function handleAmount(e) {
    dispatch({
      type: 'field/update',
      field: 'actualRentalIncome',
      payload: +e,
    });
  }

  return (
    <ColumnFormRow>
      <legend>Rent details</legend>
      <FormRow label="Rental Income">
        <FormInput
          type="number"
          id="expectedRentalIncome"
          defaultValue={expectedRentalIncome}
          disabled={true}
        />
      </FormRow>
      <FormRow label="Amount paid by tenant">
        <FormInput
          type="number"
          id="actualRentalIncome"
          defaultValue={isExpired ? 0 : actualRentalIncome}
          max={expectedRentalIncome}
          disabled={!isExpired}
          onChange={(e) => handleAmount(e.target.value)}
        />
      </FormRow>
    </ColumnFormRow>
  );
}

export default RentDetails;
