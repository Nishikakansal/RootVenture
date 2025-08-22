'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface TestimonialItem {
  name: string;
  role: string;
  feedback: string;
  avatar: string;
}

const testimonials: TestimonialItem[] = [
  {
    name: 'Ananya Patel',
    role: 'Early-Stage Founder',
    feedback:
      'RootVenture gave me a space to finally share my startup idea with like-minded people. The feedback was amazing!',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    name: 'Rohan Mehra',
    role: 'College Entrepreneur',
    feedback:
      'I loved how simple and smooth the platform is. I got 10+ comments on my idea within hours.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Sneha Verma',
    role: 'UI/UX Designer',
    feedback:
      'A community-driven platform that actually helps! I found a co-founder here.',
    avatar: 'https://i.pravatar.cc/150?img=28',
  },
  {
    name: 'Yash Singh',
    role: 'Product Manager',
    feedback:
      'RootVenture made it easy to validate my idea before even building it. The community is brilliant!',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    name: 'Priya Khanna',
    role: 'Tech Blogger',
    feedback:
      'As someone who mentors early founders, this platform is a hidden gem! I found great minds here.',
    avatar: 'https://i.pravatar.cc/150?img=18',
  },
  {
    name: 'Aarav Joshi',
    role: 'Developer & Innovator',
    feedback:
      'I found a startup team through RootVenture and we’ve already launched our MVP! Can’t believe this is free.',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
];

const Testimonial: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="bg-gray-50 py-16 px-4 md:px-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Hear from the Innovators</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Real stories from users who shared their startup ideas on RootVenture.
        </p>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-md p-6 mx-4 my-8 h-full">
              <div className="flex items-center mb-4 space-x-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
