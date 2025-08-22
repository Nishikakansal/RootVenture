import React, { FormEvent } from 'react';

const NewsLetter: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add logic to send email to backend or API
    console.log("Newsletter subscription submitted");
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-14 px-6 md:px-20 text-center rounded-xl mx-4 md:mx-16 my-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">
        Get the Latest Startup Buzz in Your Inbox
      </h2>
      <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
        Subscribe to our newsletter and never miss trending ideas, founder stories, and growth tips.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <button
          type="submit"
          className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
