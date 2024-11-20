// app/hooks/useCatalogSelection.ts

import { useState, useMemo } from 'react';

interface Product {
	id: string;
	title: string;
	handle: string;
	imageUrl?: string;
}

export function useCatalogSelection() {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	const catalogSelections = useMemo(() => {
		return selectedProducts.map(product => ({
			id: product.id,
			title: product.title,
			handle: product.handle,
			imageUrl: product.imageUrl
		}));
	}, [selectedProducts]);

	const addToCatalog = (product: Product) => {
		setSelectedProducts(prev => {
			if (!prev.find(p => p.id === product.id)) {
				return [...prev, product];
			}
			return prev;
		});
	};

	const removeFromCatalog = (productId: string) => {
		setSelectedProducts(prev => prev.filter(p => p.id !== productId));
	};

	return {
		catalogSelections,
		addToCatalog,
		removeFromCatalog,
		selectedProducts
	};
}