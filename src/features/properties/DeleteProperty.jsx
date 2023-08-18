import { deleteImages } from '../../services/apiProperties';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Spinner from '../../ui/Spinner';
import { ColumnFormRow } from './ColumnFormRow';
import { useDeleteProperty } from './useDeleteProperty';

function DeleteProperty({ id, property }) {
  const { deleteProperty, isDeleting } = useDeleteProperty();

  async function handleDelete() {
    await deleteImages(property.propertyImage);
    deleteProperty(id);
  }
  return (
    <Modal>
      <ColumnFormRow>
        <legend>Delete this Property</legend>
        <Modal.Open opens="deleteProperty">
          <div>
            <Button variation="reset">
              {isDeleting && <Spinner />}Delete this property
            </Button>
          </div>
        </Modal.Open>
        <Modal.Window name="deleteProperty">
          <ConfirmDelete resourceName="property" onConfirm={handleDelete} />
        </Modal.Window>
      </ColumnFormRow>
    </Modal>
  );
}

export default DeleteProperty;
