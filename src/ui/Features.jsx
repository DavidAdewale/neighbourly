import {
  HiAdjustmentsHorizontal,
  HiOutlineCircleStack,
  HiOutlineShieldCheck,
  HiOutlineUserPlus,
} from 'react-icons/hi2';
import FeatureCard from './FeatureCard';
import { styled } from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  gap: 2rem;

  @media only screen and (max-width: 56.25em) {
    flex-direction: column;
  }
`;

function Features() {
  const features = [
    {
      icon: <HiOutlineCircleStack />,
      title: 'Effortless Management',
      paragraph:
        'Say goodbye to paperwork and manual processes. Neighbourly streamlines property management tasks, saving you time and effort. With our user-friendly platform, you can handle everything from rent collection to lease agreements seamlessly.',
    },
    {
      icon: <HiAdjustmentsHorizontal />,
      title: 'Data Driven Decisions',
      paragraph:
        "Make data-driven decisions with ease. Neighbourly's smart reports and analytics offer valuable insights into your property's performance, helping you optimize occupancy rates and maximize rental income.",
    },
    {
      icon: <HiOutlineUserPlus />,
      title: 'User-Focused Design',
      paragraph:
        "We understand your needs and challenges. That's why Neighbourly is designed with you in mind. Intuitive navigation and user-friendly interfaces make property management a breeze, even for those new to the platform.",
    },
    {
      icon: <HiOutlineShieldCheck />,
      title: 'Secure and Reliable',
      paragraph:
        'Trust is at the heart of Neighbourly. Our robust security measures safeguard your data and ensure your privacy. You can confidently manage your properties  knowing that your information is safe.',
    },
  ];
  return (
    <StyledDiv>
      {features.map((feature) => (
        <FeatureCard feature={feature} key={feature.title} />
      ))}
    </StyledDiv>
  );
}

export default Features;
