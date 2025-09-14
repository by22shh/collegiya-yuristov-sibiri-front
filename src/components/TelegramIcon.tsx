import React from 'react';

interface TelegramIconProps {
  className?: string;
}

export default function TelegramIcon({ className = "w-5 h-5" }: TelegramIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#229ED9"/>
      <path d="M8.5 12.5L10.5 16.5L14.5 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 12.5L16.5 6.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
