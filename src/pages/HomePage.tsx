import HeroSection from '../components/home/HeroSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedPlants from '../components/home/FeaturedPlants';
import LandscapingServices from '../components/landscaping/LandscapingServices';
import GardenPortfolio from '../components/landscaping/GardenPortfolio';
import GardenPlanner from '../components/home/GardenPlanner';
import BenefitsSection from '../components/home/BenefitsSection';
import GardenJournal from '../components/home/GardenJournal';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedPlants />
      <LandscapingServices />
      <GardenPortfolio />
      <GardenPlanner />
      <BenefitsSection />
      <GardenJournal />
      <Testimonials />
      <Newsletter />
    </>
  );
}
