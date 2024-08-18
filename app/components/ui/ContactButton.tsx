// app/components/ui/ContactButton.tsx
import React from 'react';

interface ContactButtonProps {
  onClick: () => void;
  className?: string;
  text?: string;
  emoji?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  shrinkOnMobile?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  text = 'Say Hi 👋',
  emoji = '👋',
  bgColor = '#d71e97',
  textColor = 'black',
  hoverBgColor = '#AE7AFF',
  hoverTextColor = 'black',
  shrinkOnMobile = false
}) => {
  const baseClasses = `
    flex justify-center items-center py-4
    border-4 border-black transition-all duration-300
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]
    font-semibold whitespace-nowrap
  `;

  const sizeClasses = shrinkOnMobile
    ? 'w-[48px] h-[48px] rounded-full sm:w-auto sm:h-auto sm:rounded-none sm:px-6 sm:py-2'
    : 'px-6 py-2';

  const textClasses = shrinkOnMobile
    ? 'hidden sm:inline'
    : 'inline';

  const emojiClasses = shrinkOnMobile
    ? 'sm:hidden'
    : 'hidden';

  const colorClasses = `bg-[${bgColor}] hover:bg-[${hoverBgColor}] text-[${textColor}] hover:text-[${hoverTextColor}]`;

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses}
        ${colorClasses}
        ${className}
      `}
    >
      <span className={textClasses}>{text}</span>
      <span className={emojiClasses}>{emoji}</span>
    </button>
  );
};

export default ContactButton;