// app/components/contact/ContactContext.tsx
// import type { Product, CatalogContextType } from '~/types';

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
	addProduct: (product: Product) => void;
	removeProduct: (productId: string) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const openContact = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeContact = useCallback(() => {
		setIsOpen(false);
	}, []);

	const addProduct = useCallback((product: Product) => {
		setSelectedProducts(prev => {
			if (prev.some(p => p.id === product.id)) return prev;
			return [...prev, product];
		});
	}, []);

	const removeProduct = useCallback((productId: string) => {
		setSelectedProducts(prev => prev.filter(p => p.id !== productId));
	}, []);

	return (
		<ContactContext.Provider value={{
			isOpen,
			openContact,
			closeContact,
			selectedProducts,
			addProduct,
			removeProduct,
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