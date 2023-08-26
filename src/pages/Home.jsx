import { useScrollToTop } from '../hooks/useScrollToTop';
import CTASection from '../ui/CTASection';
import FeatureList from '../ui/FeatureList';
import FeaturesSection from '../ui/FeaturesSection';
import HeroSection from '../ui/HeroSection';
import NavBar from '../ui/NavBar';

function Home() {
  useScrollToTop();
  return (
    <>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <FeatureList />
    </>
  );
}

export default Home;
