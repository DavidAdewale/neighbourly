import { styled } from 'styled-components';
import Paragraph from './Paragraph';
import { useDarkMode } from '../context/DarkModeContext';

const Section = styled.div`
  padding: 6rem 10rem;

  @media only screen and (max-width: 56.25em) {
    padding: 4rem 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;

  padding: 3rem 0;

  /* border-bottom: 1px solid var(--color-form-input-focus); */

  @media only screen and (max-width: 75em) {
    text-align: center;
  }
`;

const Image = styled.div`
  max-width: 40%;
  & img {
    width: 100%;
  }
  @media only screen and (max-width: 56.25em) {
    & img {
      width: 50%;
    }
  }

  @media only screen and (max-width: 37.5em) {
    & img {
      width: 100%;
    }
  }
`;

const Copy = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (max-width: 56.25em) {
    max-width: 100%;
  }
`;

function FeatureList() {
  const { isDark } = useDarkMode();
  const imageSrc = isDark ? 'dark' : 'light';
  return (
    <Section>
      <Content>
        <Copy>
          <h3>Your Property Insights at a Glance</h3>
          <Paragraph>
            Effortlessly monitor your property portfolio&lsquo;s health with
            real-time data. Stay informed about rental income, tenant occupancy,
            and recent financial transactions, all conveniently presented in one
            centralized dashboard.
          </Paragraph>
        </Copy>
        <Image>
          <img src={`dash-${imageSrc}.png`} alt="dashboard" draggable="false" />
        </Image>
      </Content>
      <Content>
        <Image>
          <img src={`prop-${imageSrc}.png`} alt="dashboard" draggable="false" />
        </Image>
        <Copy>
          <h3>Streamlined Property Portfolio Control</h3>
          <Paragraph>
            Take charge of your properties with precision. Neighbourly
            simplifies property management, allowing you to add, edit, and
            organize properties effectively. Keep track of expected vs. actual
            rental income and occupancy status effortlessly.
          </Paragraph>
        </Copy>
      </Content>
      <Content>
        <Copy>
          <h3>Seamless Tenant Interaction</h3>
          <Paragraph>
            Enhance tenant management with ease. Neighbourly enables tenant
            tracking, lease management, and property assignment. Stay ahead of
            lease expirations and keep a clear overview of tenant information
            for efficient communication.
          </Paragraph>
        </Copy>
        <Image>
          <img
            src={`tenants-${imageSrc}.png`}
            alt="dashboard"
            draggable="false"
          />
        </Image>
      </Content>
      <Content>
        <Image>
          <img
            src={`finance-${imageSrc}.png`}
            alt="dashboard"
            draggable="false"
          />
        </Image>
        <Copy>
          <h3>Efficient Financial Tracking</h3>
          <Paragraph>
            Stay financially savvy with Neighbourly. The Finance section
            facilitates effortless income and expense recording, giving you
            immediate insights into your financial health. Visualize your
            financial data with easy-to-understand charts and reports.
          </Paragraph>
        </Copy>
      </Content>
    </Section>
  );
}

export default FeatureList;
