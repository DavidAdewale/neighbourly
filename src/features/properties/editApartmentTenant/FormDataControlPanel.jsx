import Button from '../../../ui/Button';
import { ButtonContainer } from '../../../ui/ButtonContainer';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Modal from '../../../ui/Modal';
import { formatDateDistance } from '../../../utilities/helpers';

function FormDataControlPanel({ isNotUpdated, removeTenant, apartment }) {
  const { leaseExpiryDate, occupancyStatus } = apartment;
  const isExpired = formatDateDistance(leaseExpiryDate).includes('Exp.');
  const isVacant = occupancyStatus === 'vacant';
  return (
    <ButtonContainer>
      <Button disabled={isNotUpdated}>Submit</Button>
      {!isVacant && (
        <Modal>
          <Modal.Open opens="remove">
            <Button variation="reset" type="button" disabled={!isExpired}>
              Remove tenant
            </Button>
          </Modal.Open>
          <Modal.Window name="remove">
            <ConfirmDelete resourceName="tenant" onConfirm={removeTenant} />
          </Modal.Window>
        </Modal>
      )}
    </ButtonContainer>
  );
}

export default FormDataControlPanel;
