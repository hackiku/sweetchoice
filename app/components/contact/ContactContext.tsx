// app/components/contact/ContactContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useFetcher } from '@remix-run/react';
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
	isSubmitting: boolean;
	error: string | null;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fetcher = useFetcher();

	// Load initial catalog state
	useEffect(() => {
		const loadCatalog = async () => {
			const response = await fetch('/api/contact');
			const { catalog } = await response.json();
			if (catalog?.products) {
				setSelectedProducts(catalog.products);
			}
		};
		loadCatalog();
	}, []);

	const openContact = useCallback(() => setIsOpen(true), []);
	const closeContact = useCallback(() => {
		setIsOpen(false);
		setError(null);
	}, []);

	const toggleProduct = useCallback((product: Product) => {
		const formData = new FormData();
		formData.append('_action', 'ADD_PRODUCT');
		formData.append('product', JSON.stringify(product));

		fetcher.submit(formData, {
			method: 'post',
			action: '/api/contact',
		});

		// Optimistically update UI
		setSelectedProducts(prev =>
			prev.some(p => p.id === product.id)
				? prev.filter(p => p.id !== product.id)
				: [...prev, product]
		);
	}, [fetcher]);

	const isProductSelected = useCallback(
		(productId: string) => selectedProducts.some(p => p.id === productId),
		[selectedProducts]
	);

	const clearCatalog = useCallback(() => {
		const formData = new FormData();
		formData.append('_action', 'CLEAR_CATALOG');

		fetcher.submit(formData, {
			method: 'post',
			action: '/api/contact',
		});

		setSelectedProducts([]);
	}, [fetcher]);

	// Update local state when fetcher returns
	useEffect(() => {
		if (fetcher.data?.catalog) {
			setSelectedProducts(fetcher.data.catalog.products);
		}
		if (fetcher.data?.error) {
			setError(fetcher.data.error);
		}
	}, [fetcher.data]);

	const contextValue = {
		isOpen,
		openContact,
		closeContact,
		selectedProducts,
		toggleProduct,
		isProductSelected,
		clearCatalog,
		isSubmitting: fetcher.state === 'submitting',
		error
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