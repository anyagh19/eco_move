// src/components/OrphanageCard.jsx

import React from 'react';

const OrphanageCard = ({ orphanage, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={orphanage.images[0]}
        alt={orphanage.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{orphanage.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{orphanage.description}</p>
        <button
          onClick={() => onViewDetails(orphanage)}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrphanageCard;
