import React from 'react';
import Image from 'next/image';

import A from '../assets/slack.png';
import B from '../assets/slack.png';
import C from '../assets/slack.png';
import D from '../assets/slack.png';
import E from '../assets/slack.png';

const CompanyLogo: React.FC = () => {
  const logos: StaticImageData[] = [A, B, C, D, E];

  return (
    <div className="w-full container mx-auto py-20 gap-8 px-4 sm:px-6 lg:px-8 flex sm:flex-row flex-col sm:items-center items-start">
      <div className="w-[300px] shrink-0 text-gray-600 border-l-4 border-blue-500 bg-white py-2 z-10 sm:text-base text-xl font-semibold text-left px-8">
        Proud partner at <br />
        Hubspot & Segment
      </div>

      <div className="flex animate-marque whitespace-nowrap">
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="company logo"
            className="mx-12 h-8 w-36 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogo;
