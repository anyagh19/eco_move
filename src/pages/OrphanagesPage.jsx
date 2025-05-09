
import React, { useState } from 'react';
import { orphanages } from '../data/Orphanages';
import OrphanageCard from '../components/OrphanageCard';
import OrphanageModal from '../components/OrphanageModel'; 
const OrphanagesPage = () => {
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (orphanage) => {
    setSelectedOrphanage(orphanage);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Orphanages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orphanages.map((orphanage) => (
            <OrphanageCard
              key={orphanage.id}
              orphanage={orphanage}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      {selectedOrphanage && (
        <OrphanageModal
          orphanage={selectedOrphanage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrphanagesPage;
