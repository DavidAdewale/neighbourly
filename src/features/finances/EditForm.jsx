import { styled } from 'styled-components';
import FormBox from '../../ui/FormBox';
import { ColumnFormRow } from '../properties/ColumnFormRow';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import { useReducer } from 'react';
import Button from '../../ui/Button';
import { useUpdateFinance } from './useUpdateFinance';
import { useNavigate, useParams } from 'react-router-dom';
import { useAllFinanceRecords } from './useAllFinanceRecords';
import FullPageSpinner from '../../ui/FullPageSpinner';
import Spinner from '../../ui/Spinner';

const FormContainer = styled.div`
  margin-top: 2rem;
`;

const TextArea = styled.textarea`
  width: 35rem;
  height: 8rem;
  padding: 1rem 1rem;

  background-color: var(--color-card-bg);
  color: var(--color-text);
  border: 1px solid var(--color-light-accent);

  font-family: inherit;
`;

const initialState = {
  transactionDate: null,
  amount: null,
  description: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'field/update':
      return { ...state, [action.field]: action.payload };

    default:
      return { ...state };
  }
}

function EditForm() {
  const { propertyId, entryId } = useParams();
  const { allRecords, isLoadingAllRecords } = useAllFinanceRecords(+propertyId);
  const { updateFinance, isUpdating } = useUpdateFinance();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const navigate = useNavigate();

  if (isLoadingAllRecords) return <FullPageSpinner />;

  const record = allRecords.filter((record) => record.id === +entryId).at(0);

  const {
    id,
    property_id,
    category,
    amount,
    description,
    transactionDate,
    isRent,
  } = record;

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      transactionDate: state.transactionDate || transactionDate,
      amount: state.amount || amount,
      description: state.description || description,
    };

    const oldData = {
      transactionDate: transactionDate,
      amount: amount,
      description: description,
    };

    if (JSON.stringify(oldData) === JSON.stringify(data))
      return alert('No changes logged');

    updateFinance(
      { data: data, id: id },
      { onSuccess: () => navigate(`/finances/${property_id}`) }
    );
  }

  return (
    <FormContainer>
      <FormBox onSubmit={handleSubmit}>
        <ColumnFormRow>
          <legend>Transaction reference</legend>
          <FormRow label="Transaction ID">
            <FormInput
              type="number"
              id="transactionId"
              disabled={true}
              defaultValue={id}
            />
          </FormRow>
          <FormRow label="Category">
            <Select defaultValue={category} disabled={isRent}>
              <option value="income">Income</option>
              <option value="expenses">Expense</option>
            </Select>
          </FormRow>
        </ColumnFormRow>
        <ColumnFormRow>
          <legend>Transaction details</legend>
          <FormRow label="Date of Transaction">
            <FormInput
              type="date"
              defaultValue={transactionDate}
              id="transactionDate"
              disabled={isRent}
              onChange={(e) =>
                dispatch({
                  type: 'field/update',
                  field: 'transactionDate',
                  payload: e.target.value,
                })
              }
            />
          </FormRow>
          <FormRow label="Transaction Amount">
            <FormInput
              type="number"
              defaultValue={amount}
              id="amount"
              disabled={isRent}
              onChange={(e) =>
                dispatch({
                  type: 'field/update',
                  field: 'amount',
                  payload: e.target.value,
                })
              }
            />
          </FormRow>
        </ColumnFormRow>
        <ColumnFormRow>
          <legend>Description</legend>
          <FormRow label="Enter Description">
            <TextArea
              defaultValue={description}
              disabled={isRent}
              onChange={(e) =>
                dispatch({
                  type: 'field/update',
                  field: 'description',
                  payload: e.target.value,
                })
              }
            ></TextArea>
          </FormRow>
        </ColumnFormRow>
        <div>
          <Button disabled={isRent || isUpdating}>
            {isUpdating && <Spinner />} Submit
          </Button>
        </div>
      </FormBox>
    </FormContainer>
  );
}

export default EditForm;
