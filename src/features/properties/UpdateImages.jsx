import { useState } from 'react';

import { deleteImages, uploadImages } from '../../services/apiProperties';
import { useUser } from '../authentication/useUser';

import { ColumnFormRow } from './ColumnFormRow';

import FormRow from '../../ui/FormRow';
import FormBox from '../../ui/FormBox';
import FileInput from '../../ui/FileInput';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { useUpdateProperty } from './useUpdateProperty';
import { ImagePreview } from '../../ui/ImagePreview';
import { ButtonContainer } from '../../ui/ButtonContainer';
import { ImageContainer } from '../../ui/ImageContainer';
import { HiOutlineTrash } from 'react-icons/hi2';

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

  function handleAddImage() {
    const newImageArr = [...images, ''];
    const newImagePrev = [...imgPrev, '/no-image.jpg'];
    setImages(newImageArr);
    setImagePrev(newImagePrev);
  }

  function handleRemoveImage(index) {
    const newImageArr = images.filter((_, i) => i !== index);
    const ImagePreviewArr = imgPrev.filter((_, i) => i !== index);
    setImages(newImageArr);
    setImagePrev(ImagePreviewArr);
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
            <ImageContainer>
              <ImagePreview src={imgPrev.at(index)} />
              <Button
                type="button"
                variation="reset"
                onClick={() => handleRemoveImage(index)}
              >
                <HiOutlineTrash />
              </Button>
            </ImageContainer>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          </FormRow>
        ))}
      </ColumnFormRow>
      <ButtonContainer>
        {images.length < 4 && (
          <Button variation="secondary" onClick={handleAddImage} type="button">
            Add image
          </Button>
        )}
        <Button disabled={isNotUpdated || isLoading || isUpdating}>
          {isLoading && <Spinner />}
          Save
        </Button>
      </ButtonContainer>
    </FormBox>
  );
}

export default UpdateImages;
