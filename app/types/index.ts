// app/types/index.ts

export interface Product {
	id: string;
	title: string;
	handle: string;
	imageUrl?: string;
	price?: {
		amount: string;
		currencyCode: string;
	};
	variants?: ProductVariant[];
	featuredImage?: {
		url: string;
		altText?: string;
	};
	description?: string;
	tags?: string[];
}

export interface ProductVariant {
	id: string;
	title: string;
	price: {
		amount: string;
		currencyCode: string;
	};
	sku?: string;
	available?: boolean;
}

export interface CatalogContextType {
	selectedProducts: Product[];
	addToCatalog: (product: Product) => void;
	removeFromCatalog: (productId: string) => void;
	isContactOpen: boolean;
	openContact: () => void;
	closeContact: () => void;
}