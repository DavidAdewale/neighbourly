import { useState } from 'react';
import FormRow from '../../../ui/FormRow';
import { ColumnFormRow } from '../ColumnFormRow';
import { styled } from 'styled-components';
import FormInput from '../../../ui/FormInput';
import { formatDateDistance } from '../../../utilities/helpers';
import { CheckBox, Box } from '../../../ui/CheckBox';

function UpdateRent({ dispatch, property }) {
  const { expectedRentalIncome, actualRentalIncome, leaseExpiryDate } =
    property;

  const [increase, setIncrease] = useState(false);
  const [payOutstanding, setPayOutstanding] = useState(false);

  const isExpired =
    formatDateDistance(leaseExpiryDate).includes('Exp.') ||
    leaseExpiryDate === null;

  function handleUpdateClientPayment(e) {
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

  return (
    <>
      <ColumnFormRow>
        {/* <legend>Update Rent Information</legend> */}
        {actualRentalIncome !== null &&
          actualRentalIncome < expectedRentalIncome && (
            <ColumnFormRow>
              <Box>
                <CheckBox>
                  <input
                    type="checkbox"
                    defaultValue={expectedRentalIncome - actualRentalIncome}
                    onChange={(e) => {
                      handleUpdateClientPayment(e);
                    }}
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
                      onChange={(e) =>
                        dispatch({
                          type: 'field/update',
                          field: 'actualRentalIncome',
                          payload: actualRentalIncome + +e.target.defaultValue,
                        })
                      }
                      disabled={true}
                    />
                  </FormRow>
                )}
              </Box>
            </ColumnFormRow>
          )}
        {isExpired && (
          <Box>
            <CheckBox>
              <input
                type="checkbox"
                onChange={() => {
                  dispatch({ type: 'rent/update', payload: null });
                  setIncrease(!increase);
                }}
              />
              <p>Update rent?</p>
            </CheckBox>

            {increase && (
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
    </>
  );
}

export default UpdateRent;
