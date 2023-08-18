import { useState } from 'react';
import { ColumnFormRow } from './ColumnFormRow';
import FormRow from '../../ui/FormRow';
import FileInput from '../../ui/FileInput';
import { ImagePreview } from '../../ui/ImagePreview';
import Button from '../../ui/Button';
import { ButtonContainer } from '../../ui/ButtonContainer';
import { HiOutlineTrash } from 'react-icons/hi2';
import { ImageContainer } from '../../ui/ImageContainer';

function AddPropertyImages({ dispatch }) {
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  function handleAddImage() {
    if (images.length > 4) return;
    const newImageArr = [...images, ''];
    const newImagePrev = [...imagePreview, '/no-image.jpg'];
    setImages(newImageArr);
    setImagePreview(newImagePrev);
  }

  function handleRemoveImage(index) {
    const newImageArr = images.filter((_, i) => i !== index);
    const ImagePreviewArr = imagePreview.filter((_, i) => i !== index);
    setImages(newImageArr);
    dispatch({
      type: 'field/update',
      field: 'propertyImage',
      payload: newImageArr,
    });
    setImagePreview(ImagePreviewArr);
  }
  //   console.log(images);

  function handleUploadImage(value, index) {
    const newImageArr = [...images];
    const imagePreviewArr = [...imagePreview];
    newImageArr[index] = value;
    imagePreviewArr[index] = URL.createObjectURL(value);
    setImages(newImageArr);
    dispatch({
      type: 'field/update',
      field: 'propertyImage',
      payload: newImageArr,
    });
    setImagePreview(imagePreviewArr);
  }

  return (
    <>
      <ColumnFormRow>
        <legend>Add property images (up to 4 images)</legend>
        {images.map((image, index) => (
          <FormRow key={index}>
            <ImageContainer>
              <ImagePreview src={imagePreview.at(index)} />
              <Button
                variation="reset"
                type="button"
                onClick={() => handleRemoveImage(index)}
              >
                <HiOutlineTrash />
              </Button>
            </ImageContainer>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadImage(e.target.files[0], index)}
            />
          </FormRow>
        ))}
      </ColumnFormRow>
      {images.length < 4 && (
        <ButtonContainer>
          <Button variation="secondary" type="button" onClick={handleAddImage}>
            Add image
          </Button>
        </ButtonContainer>
      )}
    </>
  );
}

export default AddPropertyImages;
