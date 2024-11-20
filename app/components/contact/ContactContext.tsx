// app/components/contact/ContactContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import ContactSlideOver from './ContactSlideOver';

interface Product {
	id: string;
	title: string;
	featuredImage?: {
		url: string;
		altText?: string;
	};
}

interface ContactContextType {
	isOpen: boolean;
	openContact: () => void;
	closeContact: () => void;
	selectedProducts: Product[];
	toggleProduct: (product: Product) => void;
	isProductSelected: (productId: string) => boolean;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const openContact = useCallback(() => setIsOpen(true), []);
	const closeContact = useCallback(() => setIsOpen(false), []);

	const toggleProduct = useCallback((product: Product) => {
		setSelectedProducts(prev =>
			prev.some(p => p.id === product.id)
				? prev.filter(p => p.id !== product.id)
				: [...prev, product]
		);
	}, []);

	const isProductSelected = useCallback((productId: string) =>
		selectedProducts.some(p => p.id === productId),
		[selectedProducts]);

	return (
		<ContactContext.Provider value={{
			isOpen,
			openContact,
			closeContact,
			selectedProducts,
			toggleProduct,
			isProductSelected,
		}}>
			{children}
			{isOpen && <ContactSlideOver onClose={closeContact} />}
		</ContactContext.Provider>
	);
}

export function useContact() {
	const context = useContext(ContactContext);
	if (context === undefined) {
		throw new Error('useContact must be used within a ContactProvider');
	}
	return context;
}