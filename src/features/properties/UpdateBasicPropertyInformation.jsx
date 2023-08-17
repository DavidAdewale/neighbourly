import Button from '../../ui/Button';
import FormBox from '../../ui/FormBox';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import { ColumnFormRow } from './ColumnFormRow';

function UpdateBasicPropertyInformation({ property }) {
  const { propertyName, address, city, state } = property;
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <FormBox onSubmit={handleSubmit}>
      <ColumnFormRow>
        <legend>Basic Property Information</legend>
        <FormRow label="Property Name">
          <FormInput value={propertyName} id="propertyName" />
        </FormRow>
        <FormRow label="Address">
          <FormInput value={address} id="address" />
        </FormRow>
        <FormRow label="City">
          <FormInput value={city} id="city" />
        </FormRow>
        <FormRow label="State">
          <FormInput value={state} id="state" />
        </FormRow>
      </ColumnFormRow>
      <div>
        <Button type="submit"> Submit</Button>
      </div>
    </FormBox>
  );
}

export default UpdateBasicPropertyInformation;
