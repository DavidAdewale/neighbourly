import { styled } from 'styled-components';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';

import { useUser } from '../authentication/useUser';

import AppPage from '../../ui/AppPage';
import FormBox from '../../ui/FormBox';
import FormInput from '../../ui/FormInput';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useAddProperty } from './useAddProperty';
import { ColumnFormRow } from './ColumnFormRow';
import { ColumnFormRow2 } from './ColumnFormRow2';
import { useState } from 'react';
import FileInput from '../../ui/FileInput';

const PageTitle = styled.h3`
  margin-bottom: 3rem;
`;

const StyledFormBox = styled(FormBox)`
  align-items: flex-start;
`;

const ImagePreview = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  & img {
    width: 15rem;
    height: 15rem;
    object-fit: cover;

    filter: brightness(80%);
    border-radius: 1rem;
    transition: all 0.3s;

    &:hover {
      filter: brightness(100%);
    }
  }
`;

const StyledColumnFormRow = styled(ColumnFormRow2)`
  display: flex;
  align-items: flex-start;
`;

function AddProperty() {
  const { register, control, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [imagePreviews, setImagePreviews] = useState([]);

  const { addProperty, isAdding } = useAddProperty();

  const { user } = useUser();
  const user_id = user.id;

  const propertyCategory = useWatch({
    control,
    name: 'propertyCategory',
  });

  const occupancy = useWatch({
    control,
    name: 'occupancyStatus',
  });

  const paidRent = useWatch({
    control,
    name: 'paymentStatus',
  });

  const {
    fields: amenities,
    append: insertAmenity,
    remove: removeAmenity,
  } = useFieldArray({
    control,
    name: 'amenities',
  });

  const {
    fields: propertyImage,
    append: insertImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'propertyImage',
  });

  function handleInsertImage(data) {
    const newImage = data[0];
    insertImage(data);
    setImagePreviews((prev) => [...prev, URL.createObjectURL(newImage)]);
  }

  function handleRemoveImage(index) {
    removeImage(index);
    setImagePreviews((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  }

  function onSubmit(data) {
    const { propertyImage: imageArray, leaseStartDate, leaseExpiryDate } = data;
    const startDate = leaseStartDate ? new Date(leaseStartDate) : null;
    const endDate = leaseExpiryDate ? new Date(leaseExpiryDate) : null;
    const formData = {
      ...data,
      leaseStartDate: startDate?.toISOString() || null,
      leaseExpiryDate: endDate?.toISOString() || null,
      propertyImage: imageArray.map((image) => image[0]),
      user_id,
    };
    addProperty(formData, { onSuccess: () => reset() });
  }

  return (
    <AppPage>
      <PageTitle>Add new property</PageTitle>
      <StyledFormBox onSubmit={handleSubmit(onSubmit)}>
        <ColumnFormRow>
          <legend>General Property Information</legend>
          <FormRow label="Property Name" error={errors?.propertyName?.message}>
            <FormInput
              type="text"
              id="propertyName"
              placeholder="The Residences"
              disabled={isAdding}
              {...register('propertyName', {
                required: 'This field is required',
              })}
            />
          </FormRow>
          <FormRow label="Property Type" error={errors?.propertyType?.message}>
            <Select
              id="propertyType"
              {...register('propertyType')}
              disabled={isAdding}
            >
              <option value="residential">Residential</option>
            </Select>
          </FormRow>
          <FormRow
            label="Property Category"
            error={errors?.propertyCategory?.message}
          >
            <Select
              id="propertyCategory"
              disabled={isAdding}
              {...register('propertyCategory', {
                required: 'This field is required',
              })}
            >
              <option value="apartment-building">Apartment Building</option>
              <option value="house">House</option>
            </Select>
          </FormRow>
          <FormRow
            label="Rent Value"
            error={errors?.expectedRentalIncome?.message}
          >
            <FormInput
              type="number"
              id="expectedRentalIncome"
              disabled={isAdding}
              {...register('expectedRentalIncome', {
                required: 'This field is required',
              })}
            />
          </FormRow>
        </ColumnFormRow>
        <ColumnFormRow>
          <legend>Property address</legend>
          <FormRow label="Address" error={errors?.address?.message}>
            <FormInput
              type="text"
              id="address"
              placeholder="123, Adam Avenue"
              disabled={isAdding}
              {...register('address', {
                required: 'This field is required',
              })}
            />
          </FormRow>
          <FormRow label="City" error={errors?.city?.message}>
            <FormInput
              type="text"
              id="city"
              placeholder="Cityville"
              disabled={isAdding}
              {...register('city', {
                required: 'This field is required',
              })}
            />
          </FormRow>
          <FormRow label="State" error={errors?.state?.message}>
            <FormInput
              type="text"
              id="state"
              placeholder="Stateville"
              disabled={isAdding}
              {...register('state', {
                required: 'This field is required',
              })}
            />
          </FormRow>
          <FormRow label="Postal code" error={errors?.postalCode?.message}>
            <FormInput
              type="text"
              id="postalCode"
              placeholder="1234"
              disabled={isAdding}
              {...register('postalCode', {
                required: 'This field is required',
              })}
            />
          </FormRow>
        </ColumnFormRow>
        <ColumnFormRow>
          <legend>Amenities</legend>
          {amenities.map((amenity, index) => (
            <FormRow key={amenity.id}>
              <ColumnFormRow2>
                <FormInput
                  {...register(`amenities.${index}`)}
                  defaultValue={amenity.name}
                  placeholder="Amenity name"
                />
                <Button
                  type="button"
                  variation="danger"
                  function="remove"
                  onClick={() => removeAmenity(index)}
                >
                  <HiXMark />
                </Button>
              </ColumnFormRow2>
            </FormRow>
          ))}
          <Button
            type="button"
            variation="button"
            function="add"
            onClick={() => insertAmenity('')}
          >
            Add Amenity
          </Button>
        </ColumnFormRow>
        <StyledColumnFormRow>
          <legend>Property Images (Add up to 4 images)</legend>
          {propertyImage.map((image, index) => (
            <FormRow key={image.id}>
              <StyledColumnFormRow>
                {!imagePreviews[index] && imagePreviews.length < 4 && (
                  <FileInput
                    type="file"
                    accept="image/*"
                    {...register(`propertyImage.${index}`)}
                    onChange={(e) => handleInsertImage(e.target.files)}
                  />
                )}
                {imagePreviews[index] && (
                  <ImagePreview>
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variation="danger"
                      function="remove"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <HiXMark />
                    </Button>
                  </ImagePreview>
                )}
              </StyledColumnFormRow>
            </FormRow>
          ))}
          {propertyImage.length < 4 && (
            <Button
              type="button"
              variation="button"
              function="add"
              onClick={() => insertImage({})}
            >
              Add Image
            </Button>
          )}
        </StyledColumnFormRow>
        <ColumnFormRow>
          <legend>Occupancy</legend>
          <FormRow
            label="Occupancy status"
            error={errors?.occupancyStatus?.message}
          >
            <Select id="occupancyStatus" {...register('occupancyStatus')}>
              <option value="vacant">Vacant</option>
              {propertyCategory === 'apartment-building' && (
                <option value="partially-occupied">Partially Occupied</option>
              )}
              <option value="occupied">Occupied</option>
            </Select>
          </FormRow>
        </ColumnFormRow>
        {occupancy === 'occupied' && propertyCategory === 'house' && (
          <ColumnFormRow>
            <FormRow label="Tenant name" error={errors?.tenantName?.message}>
              <FormInput
                type="text"
                id="tenantName"
                placeholder="Jane Doe"
                disabled={isAdding}
                {...register('tenantName', {
                  required: 'This field is required',
                })}
              />
            </FormRow>
            <FormRow label="Tenant email" error={errors?.tenantEmail?.message}>
              <FormInput
                type="email"
                id="tenantEmail"
                placeholder="tenant@example.com"
                disabled={isAdding}
                {...register('tenantEmail', {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please provide a valid email address',
                  },
                })}
              />
            </FormRow>
            <FormRow label="Paid rent?" error={errors?.isPaid?.message}>
              <Select id="paymentStatus" {...register('paymentStatus')}>
                <option value="not-paid">Not Paid</option>
                <option value="paid">Paid</option>
              </Select>
            </FormRow>
            {paidRent === 'paid' && (
              <>
                <FormRow
                  label="Lease Start Date"
                  error={errors?.leaseStateDate?.message}
                >
                  <FormInput
                    type="date"
                    id="leaseStartDate"
                    {...register('leaseStartDate', {
                      required: 'This field is required',
                    })}
                  />
                </FormRow>
                <FormRow
                  label="Lease End Date"
                  error={errors?.leaseEndDate?.message}
                >
                  <FormInput
                    type="date"
                    id="leaseExpiryDate"
                    disabled={isAdding}
                    {...register('leaseExpiryDate', {
                      required: 'This field is required',
                    })}
                  />
                </FormRow>
              </>
            )}
          </ColumnFormRow>
        )}

        <Button type="submit" variation="submit" disabled={isAdding}>
          {isAdding && <Spinner />} Submit
        </Button>
      </StyledFormBox>
    </AppPage>
  );
}

export default AddProperty;
