import { styled } from 'styled-components';
import FormBox from '../../ui/FormBox';
import { ColumnFormRow } from '../properties/ColumnFormRow';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import { useReducer } from 'react';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useUploadFinance } from './useUploadFinance';
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
  category: 'income',
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

function AddEntry({ propertyId }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { uploadFinance, isUploading } = useUploadFinance();

  const isUpdated =
    Object.values(state).filter((value) => value === null).length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      property_id: propertyId,
      category: state.category,
      transactionDate: state.transactionDate,
      amount: state.amount,
      description: state.description,
      isRent: false,
    };

    if (Object.values(data).filter((value) => value === null).length > 0)
      return alert('Please complete the form');

    uploadFinance(data, {
      onSuccess: () => navigate(`/finances/${propertyId}`),
    });
  }

  return (
    <FormContainer>
      <FormBox onSubmit={handleSubmit}>
        <ColumnFormRow>
          <legend>Transaction reference</legend>

          <FormRow label="Category">
            <Select
              value={state.category}
              onChange={(e) =>
                dispatch({
                  type: 'field/update',
                  field: 'category',
                  payload: e.target.value,
                })
              }
            >
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
              id="transactionDate"
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
              id="amount"
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
          <Button disabled={isUpdated || isUploading}>
            {isUploading && <Spinner />}Submit
          </Button>
        </div>
      </FormBox>
    </FormContainer>
  );
}

export default AddEntry;
