import { useState } from 'react';
import { Box, CheckBox } from '../../../ui/CheckBox';
import FormInput from '../../../ui/FormInput';
import FormRow from '../../../ui/FormRow';
import { ColumnFormRow } from '../ColumnFormRow';

function RentUpdatingPanel({ actions, apartment }) {
  const { expectedRentalIncome, actualRentalIncome, occupancyStatus } =
    apartment;

  const { dispatch } = actions;

  const isOccupied = occupancyStatus === 'occupied';

  const isOutstanding =
    expectedRentalIncome !== actualRentalIncome &&
    actualRentalIncome < expectedRentalIncome;

  const [payOutstanding, setPayOutstanding] = useState(false);
  const [rentUpdate, setRentUpdate] = useState(false);

  function handlePayOutstanding(e) {
    setPayOutstanding(!payOutstanding);
    if (!payOutstanding) {
      dispatch({
        type: 'field/update',
        field: 'actualRentalIncome',
        payload: actualRentalIncome + +e.target.defaultValue,
      });
    }

    if (payOutstanding) {
      dispatch({
        type: 'field/update',
        field: 'actualRentalIncome',
        payload: null,
      });
    }
  }

  function handleRentUpdate() {
    dispatch({ type: 'rent/update', payload: null });
    setRentUpdate(!rentUpdate);
  }

  return (
    <ColumnFormRow>
      <legend>Update rent information</legend>
      {isOutstanding && (
        <Box>
          <CheckBox>
            <input
              type="checkbox"
              defaultValue={expectedRentalIncome - actualRentalIncome}
              onChange={handlePayOutstanding}
            />
            <p>Client paid balance?</p>
          </CheckBox>
          {payOutstanding && (
            <FormRow label="Balance">
              <FormInput
                id="newRentAmount"
                type="number"
                defaultValue={expectedRentalIncome - actualRentalIncome}
                min={expectedRentalIncome - actualRentalIncome}
                disabled={true}
              />
            </FormRow>
          )}
        </Box>
      )}
      {isOccupied && (
        <Box>
          <CheckBox>
            <input type="checkbox" onChange={handleRentUpdate} />
            <p>Update rent?</p>
          </CheckBox>

          {rentUpdate && (
            <FormRow label="Enter New Rent Amount">
              <FormInput
                id="newRentAmount"
                type="number"
                placeholder={expectedRentalIncome}
                onChange={(e) =>
                  dispatch({ type: 'rent/update', payload: +e.target.value })
                }
              />
            </FormRow>
          )}
        </Box>
      )}
    </ColumnFormRow>
  );
}

export default RentUpdatingPanel;
