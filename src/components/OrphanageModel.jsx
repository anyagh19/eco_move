import React from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Required for screen readers
Modal.setAppElement('#root');

const OrphanageModal = ({ orphanage, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!orphanage) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-2xl mx-auto mt-20 bg-white rounded-lg shadow-xl outline-none max-h-[calc(100vh-8rem)] overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '2rem 1rem',
        },
      }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">{orphanage.name}</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto">
        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {orphanage.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${orphanage.name} - Image ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Description & Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-600">{orphanage.description}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {orphanage.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {orphanage.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {orphanage.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-6">
        <button
          onClick={() => {
            onClose();
            navigate('/donate-form', { state: { orphanageId: orphanage.id } });
          }}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Donate Now
        </button>
      </div>
    </Modal>
  );
};

export default OrphanageModal;
