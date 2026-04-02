import { LandingNav }        from '@/components/landing/nav';
import { LandingHero }       from '@/components/landing/hero';
import { LandingAbout }      from '@/components/landing/about';
import { LandingHowItWorks } from '@/components/landing/how-it-works';
import { LandingFeatures }   from '@/components/landing/features';
import { LandingMarketTicker } from '@/components/landing/market-ticker';
import { LandingRoadmap }    from '@/components/landing/roadmap';
import { LandingFAQ }        from '@/components/landing/faq';
import { LandingFooter }     from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingAbout />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingMarketTicker />
        <LandingRoadmap />
        <LandingFAQ />
      </main>
      <LandingFooter />
    </>
  );
}
