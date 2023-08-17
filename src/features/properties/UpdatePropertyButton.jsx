import { styled } from 'styled-components';
import AppPage from '../../ui/AppPage';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const StyledAppPage = styled(AppPage)`
  display: flex;
  justify-content: center;
  padding: 2rem 0 0 0;
`;

function UpdatePropertyButton({ id }) {
  const navigate = useNavigate();
  return (
    <StyledAppPage>
      <Button
        variation="formSecondary"
        onClick={() => navigate(`/properties/${id}/update`)}
      >
        Update this property
      </Button>
    </StyledAppPage>
  );
}

export default UpdatePropertyButton;
