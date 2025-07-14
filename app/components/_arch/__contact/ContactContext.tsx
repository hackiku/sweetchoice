// app/components/contact/ContactContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import ContactSlideOver from './ContactSlideOver';

interface Product {
	id: string;
	title: string;
	handle: string;
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
	clearCatalog: () => void;
	removeProduct: (productId: string) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const openContact = useCallback(() => setIsOpen(true), []);
	const closeContact = useCallback(() => setIsOpen(false), []);

	const toggleProduct = useCallback((product: Product) => {
		setSelectedProducts(prev => {
			const exists = prev.some(p => p.id === product.id);
			if (exists) {
				return prev.filter(p => p.id !== product.id);
			} else {
				return [...prev, product];
			}
		});
	}, []);

	const removeProduct = useCallback((productId: string) => {
		setSelectedProducts(prev => prev.filter(p => p.id !== productId));
	}, []);

	const isProductSelected = useCallback(
		(productId: string) => selectedProducts.some(p => p.id === productId),
		[selectedProducts]
	);

	const clearCatalog = useCallback(() => {
		setSelectedProducts([]);
	}, []);

	const contextValue = {
		isOpen,
		openContact,
		closeContact,
		selectedProducts,
		toggleProduct,
		isProductSelected,
		clearCatalog,
		removeProduct,
	};

	return (
		<ContactContext.Provider value={contextValue}>
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