// app/components/contact/ContactContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import type { ReactNode } from 'react';

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
	isSubmitting: boolean;
	error: string | null;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

interface ContactProviderProps {
	children: ReactNode;
	slideOver: React.ComponentType<{ onClose: () => void }>;
}

export function ContactProvider({ children, slideOver: SlideOver }: ContactProviderProps) {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fetcher = useFetcher();

	// Load initial catalog state
	useEffect(() => {
		const loadCatalog = async () => {
			try {
				const response = await fetch('/api/contact');
				const { catalog } = await response.json();
				if (catalog?.products) {
					setSelectedProducts(catalog.products);
				}
			} catch (err) {
				console.error('Failed to load catalog:', err);
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
		const isRemoving = selectedProducts.some(p => p.id === product.id);

		formData.append('_action', isRemoving ? 'REMOVE_PRODUCT' : 'ADD_PRODUCT');
		if (!isRemoving) {
			formData.append('product', JSON.stringify(product));
		} else {
			formData.append('productId', product.id);
		}

		fetcher.submit(formData, {
			method: 'post',
			action: '/api/contact',
		});

		// Optimistically update UI
		setSelectedProducts(prev =>
			isRemoving
				? prev.filter(p => p.id !== product.id)
				: [...prev, product]
		);
	}, [fetcher, selectedProducts]);

	const removeProduct = useCallback((productId: string) => {
		const formData = new FormData();
		formData.append('_action', 'REMOVE_PRODUCT');
		formData.append('productId', productId);

		fetcher.submit(formData, {
			method: 'post',
			action: '/api/contact',
		});

		// Optimistically update UI
		setSelectedProducts(prev => prev.filter(p => p.id !== productId));
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

		// Optimistically update UI
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
		removeProduct,
		isSubmitting: fetcher.state === 'submitting',
		error
	};

	return (
		<ContactContext.Provider value={contextValue}>
			{children}
			{isOpen && <SlideOver onClose={closeContact} />}
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