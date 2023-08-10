import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../features/properties/useProperties';
import FullPageSpinner from './FullPageSpinner';
import AppPage from './AppPage';
import { styled } from 'styled-components';
import FormBox from './FormBox';
import { ColumnFormRow } from '../features/properties/ColumnFormRow';
import FormRow from './FormRow';
import FormInput from './FormInput';
import { useState } from 'react';
import Select from './Select';
import Button from './Button';
import { useEditHouseTenant } from '../features/properties/useEditHouseTenant';
import Spinner from './Spinner';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';

const PageTitle = styled.h3`
  margin-bottom: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

function EditHouseTenant() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const { properties, isLoading } = useProperties();
  const { updateHouseTenant, isUpdating } = useEditHouseTenant();

  const [tenant, setTenant] = useState(null);
  const [email, setEmail] = useState(null);
  const [occupancy, setOccupancy] = useState(null);
  const [leaseStart, setLeaseStart] = useState(null);
  const [leaseExp, setLeaseExp] = useState(null);
  const [rent, setRent] = useState(null);
  const [paidRent, setPaidRent] = useState(null);

  if (isLoading) return <FullPageSpinner />;
  const property = properties
    .filter((property) => property.id === +propertyId)
    .at(0);
  const {
    tenantName,
    tenantEmail,
    occupancyStatus,
    leaseStartDate,
    leaseExpiryDate,
    expectedRentalIncome,
    actualRentalIncome,
  } = property;

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      tenantName: tenant === null ? tenantName : tenant,
      tenantEmail: email === null ? tenantEmail : email,
      occupancyStatus: 'occupied',
      leaseStartDate: leaseStart === null ? leaseStartDate : leaseStart,
      leaseExpiryDate: leaseExp === null ? leaseExpiryDate : leaseExp,
      expectedRentalIncome: rent === null ? expectedRentalIncome : rent,
      actualRentalIncome: paidRent === null ? actualRentalIncome : paidRent,
    };

    if (data.tenantName === null) return;

    console.log(data);

    // console.log(propertyId);
    updateHouseTenant([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  function handleRemoveTenant() {
    setTenant('');
    setEmail('');
    setPaidRent(0);

    const data = {
      tenantName: tenant,
      tenantEmail: email,
      occupancyStatus: 'vacant',
      leaseStartDate,
      leaseExpiryDate,
      actualRentalIncome: paidRent,
    };
    updateHouseTenant([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  return (
    <AppPage>
      <PageTitle>Edit tenant&lsquo;s details</PageTitle>
      <FormBox onSubmit={handleSubmit}>
        {/* <FormBox onSubmit={(e) => e.preventDefault()}> */}
        <ColumnFormRow>
          <legend>Basic tenant information</legend>

          <FormRow label="Tenant's name">
            <FormInput
              id="tenantName"
              type="text"
              value={tenant === null ? tenantName : tenant}
              onChange={(e) => setTenant(e.target.value)}
            />
          </FormRow>
          <FormRow label="Tenant's email">
            <FormInput
              id="tenantEmail"
              type="email"
              value={email === null ? tenantEmail : email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormRow>
        </ColumnFormRow>

        <ColumnFormRow>
          <legend>Lease details</legend>
          <FormRow label="Lease start date">
            <FormInput
              id="leaseStartDate"
              type="date"
              value={leaseStart === null ? leaseStartDate : leaseStart}
              onChange={(e) => setLeaseStart(e.target.value)}
            />
          </FormRow>
          <FormRow label="Lease expiry date">
            <FormInput
              id="leaseExpiryDate"
              type="date"
              value={leaseExp === null ? leaseExpiryDate : leaseExp}
              onChange={(e) => setLeaseExp(e.target.value)}
            />
          </FormRow>
        </ColumnFormRow>
        <ColumnFormRow>
          <legend>Rent Information</legend>
          <FormRow label="Rent amount">
            <FormInput
              id="expectedRentalIncome"
              type="number"
              value={rent === null ? expectedRentalIncome : rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </FormRow>
          <FormRow label="Amount paid">
            <FormInput
              id="actualRentalIncome"
              type="number"
              value={paidRent === null ? actualRentalIncome : paidRent}
              onChange={(e) => setPaidRent(e.target.value)}
            />
          </FormRow>
        </ColumnFormRow>
        <ButtonBox>
          <Button type="submit" variation="primary" disabled={isUpdating}>
            {isUpdating && <Spinner />} Submit
          </Button>
          {occupancyStatus === 'occupied' && (
            <Modal>
              <Modal.Open opens="remove">
                <Button type="button" variation="reset">
                  Remove tenant
                </Button>
              </Modal.Open>
              <Modal.Window name="remove">
                <ConfirmDelete
                  resourceName="tenant"
                  disabled={isUpdating}
                  onConfirm={() => handleRemoveTenant()}
                />
              </Modal.Window>
            </Modal>
          )}
        </ButtonBox>
      </FormBox>
    </AppPage>
  );
}

export default EditHouseTenant;
