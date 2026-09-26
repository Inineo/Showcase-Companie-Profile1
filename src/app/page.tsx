import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatWeDo from '@/components/WhatWeDo';
import SelectedWork from '@/components/SelectedWork';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatWeDo />
      <SelectedWork />
    </>
  );
}
