import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '👤',
    title: 'Step 1: Create Your Profile',
    description:
      'Sign up with your email and build your entrepreneur profile. It helps others know who’s behind the idea!',
  },
  {
    icon: '🚀',
    title: 'Step 2: Submit Your Idea',
    description:
      'Fill out a simple form with your startup name, description, industry, and optional images or documents.',
  },
  {
    icon: '🌍',
    title: 'Step 3: Get Discovered & Feedback',
    description:
      'Once posted, your idea is visible to the RootVenture community. Other users can view, like, and comment to help your idea grow.',
  },
];

const IdeaProcess: React.FC = () => {
  return (
    <section id="process" className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How it Works!!</h2>
        <p className="text-gray-600">Submit Your Idea in 3 Simple Steps</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col text-center items-center p-6 border rounded-lg shadow-sm bg-white"
          >
            <div
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center"
              style={{
                backgroundColor:
                  index === 0
                    ? '#F1EFFD'
                    : index === 1
                    ? '#FEE7E7'
                    : '#FFF3E4',
              }}
            >
              <div className="text-3xl">{feature.icon}</div>
            </div>
            <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IdeaProcess;
