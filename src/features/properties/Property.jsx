import { useParams } from 'react-router-dom';
import { useProperties } from './useProperties';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';

function Property() {
  const id = useParams().propertyId;
  const { isLoading, properties } = useProperties();
  if (isLoading) return <FullPageSpinner />;

  const property = properties.filter((property) => property.id === +id).at(0);
  console.log(property);
  return (
    <AppPage>
      <h4>{property.propertyName}</h4>
    </AppPage>
  );
}

export default Property;
