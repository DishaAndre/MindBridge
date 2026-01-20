import React from 'react';
import Image from '../../../components/AppImage';

const TestimonialCard = ({ quote, author, role, avatar, avatarAlt }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="mb-4 md:mb-6">
        <span className="text-4xl md:text-5xl text-[#4FC3F7]" role="img" aria-label="Quote">
          "
        </span>
      </div>

      <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed italic">
        {quote}
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt={avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-sm md:text-base text-gray-800">{author}</p>
          <p className="text-xs md:text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;