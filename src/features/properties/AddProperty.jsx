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
import Heading from '../../ui/Heading';
import FileInput from '../../ui/FileInput';
import { useEffect, useState } from 'react';
import { ColumnFormRow } from './ColumnFormRow';

const StyledImagePreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 1.5rem;
  filter: brightness(0.7);
  transition: all 0.3s;

  &:hover {
    filter: brightness(1);
  }
`;

const StyledColumnFormRow = styled(ColumnFormRow)`
  align-items: center;
  @media only screen and (max-width: 37.5em) {
    align-items: flex-start;
  }
`;

const ColumnFormRow2 = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  border: none;

  & legend {
    color: var(--color-light-accent);
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;

    margin-bottom: 1rem;
  }
`;

const StyledFormBox = styled(FormBox)`
  align-items: flex-start;
`;

function AddProperty() {
  const { register, control, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { addProperty, isAdding } = useAddProperty();
  const [imagePreviews, setImagePreviews] = useState([]);

  const { user } = useUser();
  const user_id = user.id;

  const selectedImages = useWatch({
    control,
    name: 'propertyImage',
    defaultValue: [],
  });

  useEffect(() => {
    const newImagePreviews = selectedImages.map((selectedFile) =>
      selectedFile && selectedFile[0]
        ? URL.createObjectURL(selectedFile[0])
        : '/no-image.jpg'
    );
    setImagePreviews(newImagePreviews);

    // Clean up the object URLs when the component unmounts or selectedImages changes
    return () => {
      newImagePreviews.forEach((objectURL) => URL.revokeObjectURL(objectURL));
    };
  }, [selectedImages]);

  function handleImagePreviewChange(index, selectedFile) {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews[index] = URL.createObjectURL(selectedFile);
    setImagePreviews(newImagePreviews);
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

  return (
    <AppPage>
      <Heading as="h3">Add new property</Heading>
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
                  onClick={() => removeAmenity(index)}
                >
                  <HiXMark />
                </Button>
              </ColumnFormRow2>
            </FormRow>
          ))}
          <Button
            type="button"
            variation="formSecondary"
            onClick={() => insertAmenity('')}
          >
            Add Amenity
          </Button>
        </ColumnFormRow>
        <StyledColumnFormRow>
          <legend>Property Images (Add up to 4 images)</legend>
          {propertyImage.map((image, index) => (
            <FormRow key={image.id}>
              <StyledImagePreview src={imagePreviews[index]} />
              <ColumnFormRow2>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImagePreviewChange(index, e.target.files[0])
                  }
                  {...register(`propertyImage.${index}`)}
                />
                <Button
                  type="button"
                  variation="danger"
                  onClick={() => removeImage(index)}
                >
                  <HiXMark />
                </Button>
              </ColumnFormRow2>
            </FormRow>
          ))}
          {propertyImage.length < 4 && (
            <Button
              type="button"
              variation="formSecondary"
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

        <Button type="submit" disabled={isAdding}>
          {isAdding && <Spinner />} Submit
        </Button>
      </StyledFormBox>
    </AppPage>
  );
}

export default AddProperty;
