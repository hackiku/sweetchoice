// app/components/contact/ContactSystem.tsx

import { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '~/types';

type ContactContextType = {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  selectedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const value = {
    isOpen,
    openContact: () => setIsOpen(true),
    closeContact: () => setIsOpen(false),
    selectedProducts,
    addProduct: (product) => setSelectedProducts(prev => [...prev, product]),
    removeProduct: (id) => setSelectedProducts(prev => prev.filter(p => p.id !== id))
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactButton />
      {isOpen && <ContactSlideOver />}
    </ContactContext.Provider>
  );
}

export function ContactButton() {
  const context = useContext(ContactContext);
  if (!context) throw new Error('Must be used within ContactProvider');

  return (
    <button
      onClick={context.openContact}
      className="fixed bottom-8 right-8 z-40 w-16 h-16 md:w-auto md:h-auto md:px-6 md:py-4
                 bg-[#d71e97] text-black font-bold rounded-full md:rounded-none
                 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]
                 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]
                 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]
                 active:translate-x-[2px] active:translate-y-[2px]
                 transition-all duration-200 flex items-center justify-center"
    >
      <span className="hidden md:inline">Say Hi</span>
      <span className="md:hidden">👋</span>
    </button>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) throw new Error('Must be used within ContactProvider');
  return context;
}