import { useScrollToTop } from '../hooks/useScrollToTop';
import CTASection from '../ui/CTASection';
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
    </>
  );
}

export default Home;
