import { styled } from 'styled-components';
import Paragraph from '../../ui/Paragraph';
import {
  HiArrowLongRight,
  HiOutlineHome,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { capitalizeFirstLetter } from '../../utilities/helpers';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 30rem;
  border-radius: 2.5rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-light-accent);
  cursor: pointer;
  overflow: hidden;

  position: relative;
  z-index: 0;

  @media only screen and (max-width: 112rem) {
    width: 25rem;
  }

  &:hover > div {
  }

  &:hover > div > img {
    filter: brightness(0.4);
    transform: scale(1.1);
  }

  &:hover > div > p {
    font-size: 1.2rem;
    transform: translateY(0);
    opacity: 1;
  }
  &:hover > div > svg {
    font-size: 1.2rem;
    transform: translateY(0);
    opacity: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 15rem;
  overflow: hidden;
  transition: all 0.3s;
  z-index: 0;
  & img {
    width: 100%;
    height: 100%;
    filter: brightness(0.9);
    object-fit: cover;
    transition: all 0.3s;
  }
`;

const CardBody = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  & p,
  svg {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    opacity: 0;
    transform: translateY(9rem);
    transition: all 0.3s;
    position: relative;
    z-index: 3;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CardDescription = styled.div`
  text-align: center;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    font-size: 1.2rem;
  }
`;

const StyledHeading = styled.h6`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

function FinancePropertyCard({ property }) {
  const { id, propertyImage, propertyName, propertyCategory } = property;
  const navigate = useNavigate();
  const displayImage = propertyImage.at(0) || '/no-image.jpg';
  return (
    <Card onClick={() => navigate(`/finances/${id}`)}>
      <CardImage>
        <img src={displayImage} />
      </CardImage>
      <CardBody>
        <p>Go to</p>
        <HiArrowLongRight />
      </CardBody>
      <CardDescription>
        <StyledHeading>{propertyName}</StyledHeading>
        <Paragraph color="faded">
          {propertyCategory === 'house' ? (
            <HiOutlineHome />
          ) : (
            <HiOutlineHomeModern />
          )}{' '}
          {capitalizeFirstLetter(propertyCategory)}
        </Paragraph>
      </CardDescription>
    </Card>
  );
}

export default FinancePropertyCard;
