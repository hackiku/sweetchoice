// app/components/ecom/WholesaleCard.tsx

import React, { useState } from 'react';

interface WholesaleCardProps {
  productName: string;
  productLink: string;
  imageUrl: string;
  imageAlt: string;
  price: React.ReactNode;
  weight: string;
  imageBgColor?: string;
  buttonBgColor?: string;
  tags?: string[];
  singleQuantity?: number;
  boxQuantity?: number;
  paletteQuantity?: number;
}

const WholesaleCard: React.FC<WholesaleCardProps> = ({
  productName,
  productLink,
  imageUrl,
  imageAlt,
  price,
  weight,
  imageBgColor = '#FFF59F',
  buttonBgColor = '#A6FAFF',
  tags = [],
  singleQuantity = 1,
  boxQuantity = 10,
  paletteQuantity = 100,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Single');

  const options = [
    { name: 'Single', emoji: '🍬' },
    { name: 'Box', emoji: '📦' },
    { name: 'Palette', emoji: '🎨' },
  ];

  const getQuantity = () => {
    switch (selectedOption) {
      case 'Single':
        return `${singleQuantity}×`;
      case 'Box':
        return `${boxQuantity}×`;
      case 'Palette':
        return `${paletteQuantity}×`;
    }
  };

  const handleOptionClick = (optionName: string) => {
    setSelectedOption(optionName);
    setIsOpen(false);
  };

  return (
    <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                    hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200">
      <div className={`mb-4 aspect-square overflow-hidden border-2 border-black relative`} style={{ backgroundColor: imageBgColor }}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center items-center rounded-full 
                         border-4 border-black transition-all duration-300 
                         hover:scale-110 w-12 h-12 text-xl bg-black text-white 
                         shadow-[4px_4px_0px_0px_#FFFFFF]"
            >
              {options.find(opt => opt.name === selectedOption)?.emoji}
            </button>
            {isOpen && (
              <div className="absolute bottom-full right-0 mb-2 flex flex-col gap-2">
                {options.filter(opt => opt.name !== selectedOption).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.name)}
                    className="flex justify-center items-center rounded-full 
                               border-4 border-black transition-all duration-300 
                               hover:scale-110 w-10 h-10 text-lg bg-white text-black 
                               shadow-[4px_4px_0px_0px_#000000]"
                    title={option.name}
                  >
                    {option.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex border-b-3 border-black mb-4">
        <div className="w-3/4 pr-4 border-r-3 border-black">
          <h2 className="text-xl font-bold mb-2">{productName}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 text-sm rounded-full border-2 border-black">
                {tag}asd
              </span>
            ))}
          </div>

        </div>
        <div className="w-1/4 pl-4 flex flex-col justify-between">
          <div className="text-right font-bold">{getQuantity()}</div>
          <div className="text-right">{weight}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
				<span className="text-lg font-bold">{tags}</span>
      </div>

      <button
        className={`w-full border-2 border-black py-2 px-4 font-bold 
                    hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                    transition-all`}
        style={{
          backgroundColor: buttonBgColor,
        }}
        onClick={(e) => {
          e.preventDefault();
          // Add to catalog logic here
        }}
      >
        Add to Catalog
      </button>
    </div>
  );
};

export default WholesaleCard;