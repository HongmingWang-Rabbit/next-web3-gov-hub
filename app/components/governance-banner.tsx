import Image from 'next/image';

export function GovernanceBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-8">
      {/* Background image */}
      <Image
        src="/landingpage/governance-banner.png"
        alt="Governance Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Content overlay */}
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">HPOT Governance</h2>
        <p className="text-sm text-gray-300 max-w-md">
          HPOT tokens grant voting rights in Honeypot governance, empowering you to directly influence proposals.
        </p>
      </div>
    </div>
  );
}
