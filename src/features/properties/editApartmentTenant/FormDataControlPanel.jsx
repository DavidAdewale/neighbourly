import Button from '../../../ui/Button';
import { ButtonContainer } from '../../../ui/ButtonContainer';

function FormDataControlPanel({ isNotUpdated }) {
  return (
    <ButtonContainer>
      <Button disabled={isNotUpdated}>Submit</Button>
      <Button variation="reset" type="button">
        Remove tenant
      </Button>
    </ButtonContainer>
  );
}

export default FormDataControlPanel;
