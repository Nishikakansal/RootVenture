import React from 'react'

const PurposeSection = () => {
    const features = [
        {
            icon: "🟣",
            title: "Share Your Vision",
            description: " Post your own ideas. Build your entrepreneur profile and showcase your contributions."
        },
        {
            icon: "🔵",
            title: "Discover Unique Ideas",
            description : "Browse innovative startup ideas from users across the globe."
        },        
        {
            icon: "🔵",
            title: "Global Visibility",
            description: "Your ideas are visible to a wide community of innovators and creators."
        },
        {
            icon: "🟣",
            title: "Connect & Collaborate",
            description: "Find co-founders, mentors, or collaborators"
        }
    ];
  return (
    <section 
    id="about"
    className='w-full bg-gray-50 py-20 px-4'>
        <div className='container mx-auto'>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
                {/* heading */}
                <div className='mt-10'>
                    <p className='text-sm text-purple-600 font-medium mb-2'>ACHIEVE MORE</p>
                    <h2 className='text-3xl md:w-4/5 w-full md:text-4xl font-bold text-gray-900'>Purpose of Rootventure
                    </h2>
                </div>

                {/*points*/}
                <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8 space-y-3'>
                    {
                        features.map((feature, index) => (
                            <div key={index} className='flex space-x-4 space-y-4'>
                                <div className='w-12 h-12 flex items-center justify-start rounded-lg'>{feature.icon}</div>

                                <div>
                                    <h3 className='text-xl font-semibold text-gray-900 mb-5'>{feature.title}</h3>
                                    <p className='text-gray-600'>{feature.description}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>


            </div>
        </div>
    </section>
  )
}

export default PurposeSection
