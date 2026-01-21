import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const signals = [
    {
      icon: 'Shield',
      title: 'WCAG AAA Certified',
      description: 'Highest accessibility standards',
      color: '#66BB6A'
    },
    {
      icon: 'Lock',
      title: 'End-to-End Encrypted',
      description: 'Your data is always secure',
      color: '#4FC3F7'
    },
    {
      icon: 'Award',
      title: 'Clinically Endorsed',
      description: 'Trusted by mental health professionals',
      color: '#AB47BC'
    },
    {
      icon: 'Heart',
      title: '10,000+ Users Supported',
      description: 'Making a difference every day',
      color: '#F06292'
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-6 md:p-10 lg:p-16 shadow-lg mb-8 md:mb-12 lg:mb-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-800">
          Trusted & Secure
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Your safety and privacy are our top priorities. We're committed to providing the highest standards of care and security.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {signals?.map((signal, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-4 md:mb-6" style={{ backgroundColor: `${signal?.color}20` }}>
              <Icon name={signal?.icon} size={32} color={signal?.color} />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2 text-gray-800">
              {signal?.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {signal?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSignals;