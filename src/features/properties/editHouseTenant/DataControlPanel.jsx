import { formatCurrency } from '../../../utilities/helpers';
import { ButtonContainer } from '../../../ui/ButtonContainer';

import ConfirmDelete from '../../../ui/ConfirmDelete';
import Modal from '../../../ui/Modal';
import Spinner from '../../../ui/Spinner';
import Button from '../../../ui/Button';

function DataControlPanel({ operations }) {
  const {
    isUploading,
    isNotUpdated,
    occupancyStatus,
    handleRemoveTenant,
    leaseExpiryDate,
  } = operations;

  const isExpired =
    formatCurrency(leaseExpiryDate).includes('Exp.') ||
    occupancyStatus === 'occupied';

  return (
    <ButtonContainer>
      <Button
        type="submit"
        variation="primary"
        disabled={isUploading || isNotUpdated}
      >
        {isUploading && <Spinner />} Submit
      </Button>
      {occupancyStatus === 'occupied' && (
        <Modal>
          <Modal.Open opens="remove">
            <Button type="button" variation="reset" disabled={isExpired}>
              Remove tenant
            </Button>
          </Modal.Open>
          <Modal.Window name="remove">
            <ConfirmDelete
              resourceName="tenant"
              disabled={isUploading}
              onConfirm={() => handleRemoveTenant()}
            />
          </Modal.Window>
        </Modal>
      )}
    </ButtonContainer>
  );
}

export default DataControlPanel;
