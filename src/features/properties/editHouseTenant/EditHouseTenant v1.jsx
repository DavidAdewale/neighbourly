import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { useProperties } from '../useProperties';
import { useUpdateProperty } from '../useUpdateProperty';
import { useScrollToTop } from '../../../hooks/useScrollToTop';

import { ColumnFormRow } from '../ColumnFormRow';

import FullPageSpinner from '../../../ui/FullPageSpinner';
import AppPage from '../../../ui/AppPage';
import FormBox from '../../../ui/FormBox';
import FormRow from '../../../ui/FormRow';
import FormInput from '../../../ui/FormInput';
import Button from '../../../ui/Button';
import Spinner from '../../../ui/Spinner';
import Modal from '../../../ui/Modal';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import AppPageTitle from '../../../ui/AppPageTitle';
import { IoChevronBackOutline } from 'react-icons/io5';
import { formatCurrency } from '../../../utilities/helpers';

const StyledAppPageTitle = styled(AppPageTitle)`
  margin-bottom: 3rem;
`;

const OweBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

function EditHouseTenant() {
  useScrollToTop();
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const { properties, isLoading } = useProperties();
  const { updateProperty, isUpdating } = useUpdateProperty();

  const [tenant, setTenant] = useState(null);
  const [email, setEmail] = useState(null);
  const [leaseStart, setLeaseStart] = useState(null);
  const [leaseExp, setLeaseExp] = useState(null);
  const [rent, setRent] = useState(null);
  const [paidRent, setPaidRent] = useState(null);

  const [paidOustanding, setPaidOutstanding] = useState(false);

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

  const oldData = {
    leaseStartDate,
    leaseExpiryDate,
    expectedRentalIncome,
    actualRentalIncome,
  };

  const changedData = {
    leaseStartDate: leaseStart === null ? leaseStartDate : leaseStart,
    leaseExpiryDate: leaseExp === null ? leaseExpiryDate : leaseExp,
    expectedRentalIncome: rent === null ? expectedRentalIncome : +rent,
    actualRentalIncome: paidRent === null ? actualRentalIncome : +paidRent,
  };

  const isChanged = JSON.stringify(oldData) === JSON.stringify(changedData);

  function handleOutstanding() {
    setPaidOutstanding(true);
    setPaidRent(expectedRentalIncome);
  }

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
      paymentStatus: actualRentalIncome
        ? actualRentalIncome === expectedRentalIncome
          ? 'paid'
          : 'partially-paid'
        : 'not-paid',
    };

    if (data.tenantName === null) return;
    if (data.actualRentalIncome > 0) {
      let income;
      if (
        leaseStartDate === data.leaseStartDate &&
        leaseExpiryDate === data.leaseExpiryDate
      ) {
        income = data.actualRentalIncome - actualRentalIncome;
      }

      income = data.actualRentalIncome;

      console.log(income);
    }

    updateProperty([data, propertyId], {
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
      leaseStartDate: null,
      leaseExpiryDate: null,
      actualRentalIncome: paidRent,
    };
    updateProperty([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  return (
    <AppPage>
      <StyledAppPageTitle>
        <h3>Edit tenant&lsquo;s details</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <IoChevronBackOutline /> Back
        </Button>
      </StyledAppPageTitle>
      <FormBox onSubmit={handleSubmit}>
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
              value={email === null ? tenantEmail : tenantEmail}
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
              disabled={actualRentalIncome > 0 && leaseStartDate}
            />
          </FormRow>
        </ColumnFormRow>
        <ColumnFormRow>
          {actualRentalIncome !== null &&
            actualRentalIncome < expectedRentalIncome && (
              <OweBox>
                <input
                  id="amountOwed"
                  type="checkbox"
                  value={expectedRentalIncome - actualRentalIncome}
                  onChange={handleOutstanding}
                />
                <p>
                  Tenant paid outstanding of{' '}
                  {formatCurrency(expectedRentalIncome - actualRentalIncome)}
                </p>
              </OweBox>
            )}
        </ColumnFormRow>
        <ButtonBox>
          <Button
            type="submit"
            variation="primary"
            disabled={isUpdating || isChanged}
          >
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
