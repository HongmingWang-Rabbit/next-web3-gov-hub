import { GovernanceBanner } from '@/components/governance-banner';
import { ProposalsSection } from '@/components/proposals-section';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <GovernanceBanner />
      <ProposalsSection />
    </div>
  );
}
