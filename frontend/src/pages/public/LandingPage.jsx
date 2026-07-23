import Hero from "../../components/common/Public/landing/Hero";
import Features from "../../components/common/Public/landing/Features";
import Statistics from "../../components/common/Public/landing/Statistics";
import UpcomingEvents from "../../components/common/Public/landing/UpcomingEvents";
import Testimonials from "../../components/common/Public/landing/Testimonials";
import CTA from "../../components/common/Public/landing/CTA";

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Statistics />
      <UpcomingEvents />
      <Testimonials />
      <CTA />
    </>
  );
}

export default LandingPage;