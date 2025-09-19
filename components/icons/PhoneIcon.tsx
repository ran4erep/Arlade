import React from 'react';

const PhoneIcon: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes rotate-phone {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(0deg);
            }
            50% {
                transform: rotate(90deg);
            }
            75% {
                transform: rotate(90deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
          .phone-icon {
            animation: rotate-phone 3s ease-in-out infinite;
          }
        `}
      </style>
      <svg
        className="phone-icon"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default PhoneIcon;
