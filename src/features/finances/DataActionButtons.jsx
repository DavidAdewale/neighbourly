import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { ButtonContainer } from '../../ui/ButtonContainer';

function DataActionButtons({ record }) {
  const navigate = useNavigate();
  console.log(record);
  return (
    <ButtonContainer>
      <Button
        variation="formSecondary"
        // onClick={() => navigate(`/finances/${propertyId}/edit/${id}`)}
      >
        Edit
      </Button>
      <Button variation="reset">Delete</Button>
    </ButtonContainer>
  );
}

export default DataActionButtons;
