'use client';

import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import Image from 'next/image';

const Main: React.FC = () => {
  const [text] = useTypewriter({
    words: ['Share', 'Discover', 'Grow Together'],
    loop: true,
    delaySpeed: 1500,
    typeSpeed: 100,
    deleteSpeed: 70,
  });

  return (
    <section
      id="home"
      className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-12 lg:px-20 py-12 md:py-24"
    >
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-8">
        {/* Idea Tag */}
        <div className="flex items-center gap-2 bg-gray-100 w-fit px-4 py-2 rounded-full hover:bg-gray-200 transition">
          <span className="text-blue-600 text-lg">💡</span>
          <span className="text-sm font-medium text-gray-700">
            Got an Idea? We Are Listening
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug md:leading-tight">
          <span className="block mb-2">RootVenture: Where Startup Dreams</span>
          <span className="inline-block relative">
            Take Root <span className="animate-pulse">🌱</span>
            <span className="absolute left-0 w-full h-0.5 bottom-0 bg-blue-300/60" />
          </span>
        </h1>

        {/* Typewriter Effect */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-600">
          {text}
          <Cursor cursorStyle="|" />
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-xl">
          Share Your Idea... Upload your concept and let others see your vision.
        </p>

        {/* Email Input */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full px-5 py-3 rounded-xl border border-gray-400 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition hover:shadow-md">
            →
          </button>
        </div>
      </div>

      {/* Right Column - Animation */}
      <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center items-center">
        <Image
          src="/Creativity.gif"
          alt="Creative Startup Animation"
          width={500}
          height={500}
          className="object-contain"
          unoptimized
        />
      </div>
    </section>
  );
};

export default Main;
