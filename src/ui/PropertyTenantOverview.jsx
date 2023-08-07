import {
  HiOutlineBuildingOffice,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
} from 'react-icons/hi2';
import { css, styled } from 'styled-components';
import { capitalizeFirstLetter } from '../utilities/helpers';
import Paragraph from './Paragraph';

const OverviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 3rem;

  padding: 4rem 8rem;

  @media only screen and (max-width: 52.65em) {
    justify-content: space-around;
    flex-direction: column;
    padding: 4rem 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 4rem 2rem;
  }
`;

const OverviewMeter = styled.div`
  /* min-width: 30rem; */
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  text-align: center;

  border: 1px dashed var(--color-btn-secondary-hover);
  background-color: var(--color-card-bg);
  border-radius: 0.5rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-btn-text-faded);
  }
`;

const StyledParagraph = styled(Paragraph)`
  ${(props) =>
    props.size === 'small' &&
    css`
      text-transform: uppercase;
      color: var(--color-light-accent);
      letter-spacing: 0.2rem;
    `}
`;

function PropertyTenantOverview({ propertyInfo }) {
  const { propertyCategory, tenantName, tenantEmail, propertyDetails } =
    propertyInfo;
  //   const { totalApartments, apartments } = propertyDetails || null;
  //   console.log(totalApartments);

  //   console.log(propertyCategory);
  if (propertyCategory === 'house')
    return (
      <OverviewContainer>
        <OverviewMeter>
          <HiOutlineHome />
          <Paragraph>{capitalizeFirstLetter(propertyCategory)}</Paragraph>
          <StyledParagraph size="small">Property Category</StyledParagraph>
        </OverviewMeter>

        <OverviewMeter>
          <HiOutlineUser /> <Paragraph>{tenantName}</Paragraph>
          <StyledParagraph size="small">Tenant Name</StyledParagraph>
        </OverviewMeter>

        <OverviewMeter>
          <HiOutlineEnvelope /> <Paragraph>{tenantEmail}</Paragraph>
          <StyledParagraph size="small">Tenant E-mail</StyledParagraph>
        </OverviewMeter>
      </OverviewContainer>
    );

  if (propertyCategory === 'apartment-building')
    return (
      <OverviewContainer>
        <OverviewMeter>
          <HiOutlineHomeModern />
          <Paragraph>{capitalizeFirstLetter(propertyCategory)}</Paragraph>
          <StyledParagraph size="small">Property Category</StyledParagraph>
        </OverviewMeter>
        {propertyDetails && (
          <OverviewMeter>
            <HiOutlineBuildingOffice />
            <Paragraph>{propertyDetails.totalApartments}</Paragraph>
            <StyledParagraph size="small">apartments</StyledParagraph>
          </OverviewMeter>
        )}
      </OverviewContainer>
    );
}

export default PropertyTenantOverview;
