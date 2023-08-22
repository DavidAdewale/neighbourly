import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { ButtonContainer } from '../../ui/ButtonContainer';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteRecord } from './useDeleteRecord';

function DataActionButtons({ record }) {
  const navigate = useNavigate();
  const { deleteRecord } = useDeleteRecord();
  const { id, property_id: propertyId, isRent } = record;

  function handleDelete() {
    deleteRecord(id, { onSettled: () => navigate(`/finances/${propertyId}`) });
  }

  if (isRent) return;
  return (
    <ButtonContainer>
      <Button
        variation="formSecondary"
        onClick={() => navigate(`/finances/${propertyId}/edit/${id}`)}
      >
        Edit
      </Button>
      <Modal>
        <Modal.Open opens="delete">
          <Button variation="reset">Delete</Button>
        </Modal.Open>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName="record" onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </ButtonContainer>
  );
}

export default DataActionButtons;
