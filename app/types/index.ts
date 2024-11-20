// app/types/index.ts 
export interface Product {
	id: string;
	title: string;
	handle: string;
	variants: {
		nodes: Array<{
			selectedOptions: Array<{
				name: string;
				value: string;
			}>;
			weight: number;
			weightUnit: string;
			availableForSale: boolean;
		}>;
	};
	featuredImage?: {
		url: string;
		altText?: string;
		width?: number;
		height?: number;
	};
	priceRange: {
		minVariantPrice: {
			amount: string;
			currencyCode: string;
		};
	};
	tags?: string[];
}

export interface CatalogContextType {
	selectedProducts: Product[];
	addToCatalog: (product: Product) => void;
	removeFromCatalog: (productId: string) => void;
	isContactOpen: boolean;
	openContact: () => void;
	closeContact: () => void;
}


// app/types/index.ts 

// export interface Product {
//   id: string;
//   title: string;
//   handle: string;
//   variants: {
//     nodes: Array<{
//       selectedOptions: Array<{
//         name: string;
//         value: string;
//       }>;
//       weight: number;
//       weightUnit: string;
//       availableForSale: boolean;
//     }>;
//   };
//   featuredImage?: {
//     url: string;
//     altText?: string;
//     width?: number;
//     height?: number;
//   };
//   priceRange: {
//     minVariantPrice: {
//       amount: string;
//       currencyCode: string;
//     };
//   };
//   tags?: string[];
// }

