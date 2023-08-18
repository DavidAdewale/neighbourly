import { useState } from 'react';
import FormBox from '../../ui/FormBox';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import { ColumnFormRow } from './ColumnFormRow';
import DeleteApartment from './DeleteApartment';
import AddApartments from './AddApartments';

function UpdatePropertyDetails({ property }) {
  const { id, propertyDetails } = property;
  const { totalApartments, apartments } = propertyDetails;

  const sortedApartments = apartments.sort((a, b) =>
    a.apartmentNumber.localeCompare(b.apartmentNumber)
  );

  const [apartmentDetail, setApartmentDetail] = useState(
    sortedApartments.at(0).apartmentNumber
  );

  const currentApartment = apartments
    .filter((apartment) => apartment.apartmentNumber === apartmentDetail)
    .at(0);

  function handleSelectedApartment(e) {
    setApartmentDetail(e);
  }

  return (
    <FormBox>
      <ColumnFormRow>
        <legend>Edit Apartments</legend>
        <FormRow label="Number of apartments">
          <FormInput
            value={totalApartments}
            id="totalApartments"
            type="number"
            disabled={true}
          />
        </FormRow>
        <FormRow label="Select apartment">
          <Select
            id="editAparment"
            onChange={(e) => handleSelectedApartment(e.target.value)}
          >
            {sortedApartments.map((apartment) => (
              <option
                value={apartment.apartmentNumber}
                key={apartment.apartmentNumber}
              >
                {apartment.apartmentNumber}
              </option>
            ))}
          </Select>
        </FormRow>
      </ColumnFormRow>
      <DeleteApartment
        apartments={apartments}
        currentApartment={currentApartment}
        id={id}
      />
      <AddApartments propertyDetails={propertyDetails} id={id} />
    </FormBox>
  );
}

export default UpdatePropertyDetails;
