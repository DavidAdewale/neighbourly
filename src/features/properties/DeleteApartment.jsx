import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Modal from '../../ui/Modal';
import Spinner from '../../ui/Spinner';
import { capitalizeFirstLetter } from '../../utilities/helpers';
import { ColumnFormRow } from './ColumnFormRow';
import { useUpdateProperty } from './useUpdateProperty';
import ConfirmDelete from '../../ui/ConfirmDelete';

function DeleteApartment({ apartments, currentApartment, id }) {
  const { updateProperty, isUpdating } = useUpdateProperty();
  const navigate = useNavigate();

  const isOccupied = currentApartment.occupancyStatus === 'occupied';

  function handleDelete(e) {
    const notDeletedApartments = apartments.filter(
      (apartment) => apartment.apartmentNumber !== e.apartmentNumber
    );
    const newData = {
      totalApartments: notDeletedApartments.length,
      apartments: notDeletedApartments,
    };

    const newDataJSON = { propertyDetails: JSON.stringify(newData) };
    updateProperty([newDataJSON, id], { onSettled: () => navigate(-1) });
  }
  return (
    <>
      <ColumnFormRow>
        <legend>Apartment details</legend>
        <FormRow label="Occupancy status">
          <FormInput
            value={capitalizeFirstLetter(currentApartment.occupancyStatus)}
            id="occupancyStatus"
            disabled={true}
          />
        </FormRow>
        {currentApartment.occupancyStatus === 'occupied' && (
          <>
            <FormRow label="Current occupant">
              <FormInput
                value={currentApartment.tenantName}
                disabled={true}
                id="tenantName"
              />
            </FormRow>
          </>
        )}
      </ColumnFormRow>
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button
              type="button"
              variation="reset"
              disabled={isUpdating || isOccupied}
            >
              {isUpdating && <Spinner />}
              {`Delete apartment ${currentApartment.apartmentNumber}`}
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="apartment"
              onConfirm={() => handleDelete(currentApartment)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default DeleteApartment;
