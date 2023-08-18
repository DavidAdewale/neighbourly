import { useState } from 'react';
import { styled } from 'styled-components';
import { Empty } from './Empty';
import { PiWarningThin } from 'react-icons/pi';
import Paragraph from './Paragraph';

const PropertyImageBox = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
`;

const MainDisplay = styled.div`
  width: 800px;
  height: 450px;
  overflow: hidden;
  border-radius: 0.6rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 112em) {
    width: 650px;
    height: 350px;
  }

  @media only screen and (max-width: 56.25em) {
    width: 500px;
    height: 250px;
  }
  @media only screen and (max-width: 37.5em) {
    width: 300px;
    height: 180px;
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media only screen and (max-width: 56.25em) {
    flex-direction: row;
  }
`;

const PreviewDisplay = styled.div`
  width: 150px;
  height: 90px;
  overflow: hidden;
  border-radius: 0.6rem;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 56.25em) {
    width: 100px;
    height: 65px;
  }

  @media only screen and (max-width: 37.5em) {
    width: 70px;
    height: 45px;
  }
`;

function PropertyImage({ propertyImages }) {
  const [mainImage, setMainImage] = useState(propertyImages.at(0));
  if (propertyImages.length === 0)
    return (
      <Empty>
        <PiWarningThin />
        <Paragraph color="faded">
          No image to display - Please upload images of property
        </Paragraph>
      </Empty>
    );
  {
    if (propertyImages.length > 0) {
      return (
        <PropertyImageBox>
          <MainDisplay>
            <img src={mainImage} />
          </MainDisplay>
          <Preview>
            {propertyImages.map((img, index) => (
              <PreviewDisplay
                key={img}
                onClick={() => setMainImage(propertyImages.at(index))}
              >
                <img src={img} />
              </PreviewDisplay>
            ))}
          </Preview>
        </PropertyImageBox>
      );
    }
  }
}

export default PropertyImage;
