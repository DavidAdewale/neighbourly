import { useState } from 'react';
import { styled } from 'styled-components';

import { deleteImages, uploadImages } from '../../services/apiProperties';
import { useUser } from '../authentication/useUser';

import { ColumnFormRow } from './ColumnFormRow';

import FormRow from '../../ui/FormRow';
import FormBox from '../../ui/FormBox';
import FileInput from '../../ui/FileInput';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useUpdateProperty } from './useUpdateProperty';

const ImagePreview = styled.img`
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

function UpdateImages({ property }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { updateProperty, isUpdating } = useUpdateProperty();

  const { id, propertyImage } = property;
  const [images, setImages] = useState([...propertyImage]);
  const [imgPrev, setImagePrev] = useState([...propertyImage]);

  const copyOfImages = [...propertyImage];
  const user_id = user.id;
  const isNotUpdated = JSON.stringify(propertyImage) === JSON.stringify(images);

  function handleImageChange(index, selectedFile) {
    const imagePrev = [...imgPrev];
    const newImages = [...images];
    imagePrev[index] = URL.createObjectURL(selectedFile);
    newImages[index] = selectedFile;
    setImages(newImages);
    setImagePrev(imagePrev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const updatedImages = images.filter(
      (image, index) => image !== copyOfImages.at(index)
    );
    const unchangedImages = images.filter(
      (image, index) => image === copyOfImages.at(index)
    );
    const changedImages = copyOfImages.filter(
      (image, index) => image !== images.at(index)
    );

    const newImageArray = await uploadImages(updatedImages, user_id);
    await deleteImages(changedImages);

    const newImages = [...newImageArray, ...unchangedImages];
    const newData = {
      propertyImage: JSON.stringify(newImages),
    };

    updateProperty([newData, id]);
    setIsLoading(false);
  }
  return (
    <FormBox onSubmit={handleSubmit}>
      <ColumnFormRow>
        <legend>Property Images</legend>
        {images.map((image, index) => (
          <FormRow key={index}>
            <ImagePreview src={imgPrev.at(index)} />
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          </FormRow>
        ))}
      </ColumnFormRow>
      <div>
        <Button disabled={isNotUpdated || isLoading || isUpdating}>
          {isLoading && <Spinner />}
          Save
        </Button>
      </div>
    </FormBox>
  );
}

export default UpdateImages;
