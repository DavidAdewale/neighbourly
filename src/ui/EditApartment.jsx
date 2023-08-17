import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useProperties } from '../features/properties/useProperties';
import { useUpdateProperty } from '../features/properties/useUpdateProperty';

import {
  accumulateIncome,
  checkPropertyStatus,
  formatDateDistance,
} from '../utilities/helpers';
import { useScrollToTop } from '../hooks/useScrollToTop';

import AppPage from './AppPage';
import FullPageSpinner from './FullPageSpinner';
import FormRow from './FormRow';
import FormBox from './FormBox';
import FormInput from './FormInput';
import Select from './Select';
import Paragraph from './Paragraph';
import Button from './Button';
import { ColumnFormRow } from '../features/properties/ColumnFormRow';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';
import AppPageTitle from './AppPageTitle';

const StyledFormBox = styled(FormBox)`
  margin-top: 3rem;
`;

const Warning = styled.div`
  background-color: var(--color-btn-reset);
  color: var(--color-btn-text);
  text-align: center;
  padding: 2rem 2rem;

  max-width: 30rem;
  border-radius: 0.4rem;

  & svg {
    width: 2.6rem;
    height: 2.6rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

function EditApartment() {
  useScrollToTop();
  const { propertyId, apartmentName } = useParams();
  const { properties, isLoading } = useProperties();

  const { updateProperty, isUpdating } = useUpdateProperty();
  const navigate = useNavigate();

  const property = properties
    ?.filter((property) => property.id === +propertyId)
    .at(0);
  const propertyDetails = property?.propertyDetails;

  const apartment = propertyDetails?.apartments
    ?.filter((apartment) => apartment.apartmentNumber === apartmentName)
    .at(0);

  const otherApartments = propertyDetails.apartments.filter(
    (apartment) => apartment.apartmentNumber !== apartmentName
  );

  const [aptName, setAptName] = useState(apartmentName);
  const [tenant, setTenant] = useState(apartment?.tenantName || '');
  const [email, setEmail] = useState(apartment?.tenantEmail || '');
  const [occupancy, setOccupancy] = useState(apartment?.occupancyStatus || '');
  const [leaseStart, setLeaseStart] = useState(apartment?.leaseStartDate || '');
  const [leaseExpiry, setLeaseExpiry] = useState(
    apartment?.leaseExpiryDate || ''
  );
  const [rent, setRent] = useState(apartment?.expectedRentalIncome || '');
  const [paidRent, setPaidRent] = useState(apartment?.actualRentalIncome || '');

  if (isLoading) return <FullPageSpinner />;

  function batchUpdates() {
    const update = {
      apartmentNumber: aptName,
      tenantName: tenant,
      tenantEmail: email,
      occupancyStatus: occupancy,
      leaseStartDate: leaseStart,
      leaseExpiryDate: leaseExpiry,
      expectedRentalIncome: rent,
      actualRentalIncome: paidRent,
    };

    return update;
  }

  function processData(update) {
    const newData = [...otherApartments, update];
    const propertyUpdate = {
      totalApartments: newData.length,
      apartments: newData,
    };

    const propertyDetailsJSON = JSON.stringify(propertyUpdate);

    const totalRentalIncome = accumulateIncome(newData, 'expectedRentalIncome');
    const totalActualRentalIncome = accumulateIncome(
      newData,
      'actualRentalIncome'
    );

    const propertyStatus = checkPropertyStatus(newData);

    const data = {
      expectedRentalIncome: totalRentalIncome,
      actualRentalIncome: totalActualRentalIncome,
      occupancyStatus: propertyStatus,
      propertyDetails: propertyDetailsJSON,
    };

    updateProperty([data, propertyId], {
      onSettled: () => navigate(`/properties/${propertyId}`),
    });
  }

  function handleSubmit(e) {
    e?.preventDefault();

    const update = batchUpdates();

    if (JSON.stringify(update) === JSON.stringify(apartment)) return;

    processData(update, 'Apartment successfully modified');
  }

  function handleRemove() {
    const update = {
      apartmentNumber: aptName,
      tenantName: '',
      tenantEmail: '',
      occupancyStatus: 'vacant',
      leaseStartDate: null,
      leaseExpiryDate: null,
      expectedRentalIncome: +rent,
      actualRentalIncome: 0,
    };
    processData(update, 'Tenant successfully removed');
  }

  return (
    <AppPage>
      <AppPageTitle>
        <h3>Edit Apartment {apartmentName}</h3>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          <IoChevronBackOutline /> Back
        </Button>
      </AppPageTitle>
      <StyledFormBox onSubmit={handleSubmit}>
        <ColumnFormRow>
          <legend>Edit apartment details</legend>
          <FormRow label="Apartment number">
            <FormInput
              type="text"
              id="apartmentNumber"
              value={aptName}
              onChange={(e) => setAptName(e.target.value)}
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow label="Occupancy Status">
            <Select
              value={occupancy}
              disabled={isUpdating}
              onChange={(e) => setOccupancy(e.target.value)}
            >
              <option value="vacant">Vacant</option>
              <option value="occupied">Occupied</option>
            </Select>
          </FormRow>
        </ColumnFormRow>
        {occupancy === 'occupied' && (
          <>
            <ColumnFormRow>
              <legend>Edit tenant details</legend>

              <FormRow label="Tenant Name">
                <FormInput
                  type="text"
                  id="tenantName"
                  disabled={isUpdating}
                  value={tenant || ''}
                  onChange={(e) => setTenant(e.target.value)}
                />
              </FormRow>
              <FormRow label="Tenant Email">
                <FormInput
                  type="text"
                  id="tenantEmail"
                  disabled={isUpdating}
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormRow>
              <FormRow label="Lease start Date">
                <FormInput
                  type="date"
                  id="leaseStartDate"
                  disabled={isUpdating}
                  value={leaseStart || ''}
                  onChange={(e) => setLeaseStart(e.target.value)}
                />
              </FormRow>
              <FormRow label="Lease expiry Date">
                <FormInput
                  type="date"
                  id="leaseExpiry"
                  disabled={isUpdating}
                  value={leaseExpiry || ''}
                  onChange={(e) => setLeaseExpiry(e.target.value)}
                />
              </FormRow>
            </ColumnFormRow>
            {!isLoading &&
              apartment &&
              leaseExpiry &&
              !formatDateDistance(leaseExpiry).includes('Exp.') && (
                <Paragraph color="faded">
                  {apartment?.tenantName}&lsquo;s rent expires{' '}
                  {formatDateDistance(leaseExpiry)}
                </Paragraph>
              )}
            {!isLoading &&
              apartment &&
              leaseExpiry &&
              formatDateDistance(leaseExpiry).includes('Exp.') &&
              apartment?.occupancyStatus !== 'vacant' && (
                <Warning>
                  <HiOutlineExclamationTriangle />
                  <Paragraph>This tenant&lsquo;s rent is expired</Paragraph>
                </Warning>
              )}
          </>
        )}
        <ColumnFormRow>
          <legend>Rent details</legend>
          <FormRow label="Rental Income">
            <FormInput
              type="number"
              value={rent}
              id="expectedRentalIncome"
              disabled={isUpdating}
              onChange={(e) => setRent(e.target.value)}
            />
          </FormRow>
          <FormRow label="Amount paid by tenant">
            <FormInput
              type="number"
              id="actualRentalIncome"
              value={
                !isLoading &&
                apartment &&
                leaseExpiry &&
                formatDateDistance(leaseExpiry).includes('Exp.')
                  ? 0
                  : paidRent
              }
              onChange={(e) => setPaidRent(e.target.value)}
            />
          </FormRow>
        </ColumnFormRow>
        <ButtonBox>
          <Button type="submit">Submit</Button>
          {apartment?.occupancyStatus === 'occupied' && (
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
                  onConfirm={handleRemove}
                />
              </Modal.Window>
            </Modal>
          )}
        </ButtonBox>
      </StyledFormBox>
    </AppPage>
  );
}

export default EditApartment;
