// app/lib/i18n/translations/pages/collections.ts

export const collections = {
	en: {
		header: {
			productsLabel: "HOLIDAY COLLECTION",
			allProductsLabel: "PRODUCTS",
			allProductsTitle: {
				line1: "All Products",
				line2: "All Seasons",
				line3: "All Year Long"
			}
		},
		cta: {
			getCatalog: "Get Catalog →"
		},
		filters: {
			sort: {
				label: "Sort by",
				options: {
					featured: "Featured",
					bestSelling: "Best selling",
					titleAsc: "Alphabetically, A-Z",
					titleDesc: "Alphabetically, Z-A",
					priceAsc: "Price, low to high",
					priceDesc: "Price, high to low",
					dateAsc: "Date, old to new",
					dateDesc: "Date, new to old"
				}
			},
			stock: {
				label: "Availability",
				options: {
					all: "All products",
					inStock: "In stock",
					outOfStock: "Out of stock"
				}
			},
			grid: {
				label: "Grid size",
				options: {
					two: "Grid: 2",
					three: "Grid: 3",
					four: "Grid: 4",
					five: "Grid: 5",
					six: "Grid: 6"
				}
			}
		},
		pagination: {
			previous: "← Previous",
			next: "Next →",
			loading: "Loading..."
		},
		loadMore: {
			showMore: "Show More ↓",
			showLess: "Show Less ↑"
		},
		trust: {
			title: "Trusted by leading supermarkets & retailers"
		}
	},
	sr: {
		header: {
			productsLabel: "PRAZNIČNA KOLEKCIJA",
			allProductsLabel: "PROIZVODI",
			allProductsTitle: {
				line1: "Svi Proizvodi",
				line2: "Sva Godišnja Doba",
				line3: "Cele Godine"
			}
		},
		cta: {
			getCatalog: "Preuzmi Katalog →"
		},
		filters: {
			sort: {
				label: "Sortiraj po",
				options: {
					featured: "Istaknuto",
					bestSelling: "Najprodavanije",
					titleAsc: "Abecedno, A-Ž",
					titleDesc: "Abecedno, Ž-A",
					priceAsc: "Ceni, rastuće",
					priceDesc: "Ceni, opadajuće",
					dateAsc: "Datumu, najstarije",
					dateDesc: "Datumu, najnovije"
				}
			},
			stock: {
				label: "Dostupnost",
				options: {
					all: "Svi proizvodi",
					inStock: "Na stanju",
					outOfStock: "Nije na stanju"
				}
			},
			grid: {
				label: "Veličina mreže",
				options: {
					two: "Po redu: 2",
					three: "Po redu: 3",
					four: "Po redu: 4",
					five: "Po redu: 5",
					six: "Po redu: 6"
				}
			}
		},
		pagination: {
			previous: "← Prethodna",
			next: "Sledeća →",
			loading: "Učitavanje..."
		},
		loadMore: {
			showMore: "Prikaži Više ↓",
			showLess: "Prikaži Manje ↑"
		},
		trust: {
			title: "Veruju nam vodeći supermarketi i prodavci"
		}
	}
} as const;
