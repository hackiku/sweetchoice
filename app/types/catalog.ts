// app/types/catalog.ts

export interface Product {
	id: string;
	title: string;
	handle: string;
	imageUrl?: string;
	price?: string;
	variants?: ProductVariant[];
}

export interface ProductVariant {
	id: string;
	title: string;
	price: string;
}