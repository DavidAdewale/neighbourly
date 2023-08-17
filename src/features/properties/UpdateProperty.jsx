import { useParams } from 'react-router-dom';
import { useProperties } from './useProperties';
import FullPageSpinner from '../../ui/FullPageSpinner';
import AppPage from '../../ui/AppPage';
import FormBox from '../../ui/FormBox';
import { ColumnFormRow } from './ColumnFormRow';
import FormRow from '../../ui/FormRow';
import FormInput from '../../ui/FormInput';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import UpdateBasicPropertyInformation from './UpdateBasicPropertyInformation';

function UpdateProperty() {
  const id = useParams().propertyId;
  const { properties, isLoading } = useProperties();
  if (isLoading) return <FullPageSpinner />;
  const property = properties.filter((property) => property.id === +id).at(0);
  console.log(property);
  return (
    <AppPage>
      <Heading as="h3">Edit {property.propertyName}</Heading>
      <UpdateBasicPropertyInformation property={property} />
    </AppPage>
  );
}

export default UpdateProperty;
