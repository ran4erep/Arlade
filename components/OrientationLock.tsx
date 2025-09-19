import React from 'react';
import PhoneIcon from './icons/PhoneIcon';

const OrientationLock: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 text-white text-center p-4">
      <div className="mb-8">
        <PhoneIcon />
      </div>
      <h1 className="text-2xl font-bold mb-2">Пожалуйста, поверните ваше устройство</h1>
      <p className="text-lg text-gray-400">Для лучшего опыта играйте в горизонтальном режиме.</p>
    </div>
  );
};

export default OrientationLock;
