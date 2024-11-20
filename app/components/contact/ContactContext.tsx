// app/components/contact/ContactContext.tsx

import { createContext, useContext, useState, useCallback } from 'react';
import type { Product, CatalogContextType } from '~/types';
import ContactSlideOver from './ContactSlideOver';

const ContactContext = createContext<CatalogContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [isContactOpen, setIsContactOpen] = useState(false);

	const addToCatalog = useCallback((product: Product) => {
		setSelectedProducts(prev => {
			if (!prev.find(p => p.id === product.id)) {
				return [...prev, product];
			}
			return prev;
		});
	}, []);

	const removeFromCatalog = useCallback((productId: string) => {
		setSelectedProducts(prev => prev.filter(p => p.id !== productId));
	}, []);

	const openContact = useCallback(() => {
		setIsContactOpen(true);
	}, []);

	const closeContact = useCallback(() => {
		setIsContactOpen(false);
	}, []);

	return (
		<ContactContext.Provider value={{
			selectedProducts,
			addToCatalog,
			removeFromCatalog,
			isContactOpen,
			openContact,
			closeContact,
		}}>
			{children}
			{isContactOpen && <ContactSlideOver onClose={closeContact} />}
		</ContactContext.Provider>
	);
}

export function useContact() {
	const context = useContext(ContactContext);
	if (!context) {
		throw new Error('useContact must be used within a ContactProvider');
	}
	return context;
}