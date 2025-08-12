// app/lib/i18n/translations/components/product.ts

export const product = {
	en: {
		meta: {
			title: "{{productTitle}} | SweetChoice"
		},
		gallery: {
			noImage: "No Image Available",
			viewImage: "View {{index}} of {{total}}",
			imageCounter: "{{current}} / {{total}}"
		},
		info: {
			packageSize: {
				label: "Package Size",
				unit: "box"
			},
			shelfLife: {
				label: "Shelf Life",
				unit: "months"
			},
			availability: {
				available: "Available for Order",
				outOfStock: "Currently Out of Stock"
			},
			weight: {
				label: "Package Weight"
			},
			features: {
				title: "Key Features",
				defaults: [
					"Premium Quality",
					"Long Shelf Life",
					"Seasonal Packaging"
				]
			},
			options: {
				title: "Product Options"
			},
			b2bNote: {
				title: "B2B Sales Only:",
				description: "Contact us for wholesale pricing, minimum order quantities, and custom packaging options."
			}
		},
		actions: {
			addToCatalog: "Add to Catalog",
			addedToCatalog: "Added to Catalog",
			getCatalog: "Get Catalog",
			getFullCatalog: "Get Catalog →"
		},
		packaging: {
			title: "Packaging Options",
			pallet: {
				title: "Pallet Packaging",
				unitsPerPallet: "Units per Pallet",
				transportBoxes: "Transport Boxes"
			},
			transport: {
				title: "Transport Box",
				unitsPerBox: "Units per Box"
			},
			commercial: {
				title: "Commercial Pack",
				unitsPerPack: "Units per Pack"
			},
			alternative: "or"
		},
		description: {
			title: "Product Details",
			placeholder: {
				title: "Premium Quality Seasonal Treats",
				intro: "Our {{productName}} represents the perfect blend of traditional confectionery craftsmanship and modern production standards. Each piece is carefully crafted to deliver exceptional taste and visual appeal that delights customers season after season.",
				features: {
					title: "Key Features:",
					list: [
						"Premium ingredients sourced from trusted suppliers",
						"Vibrant colors and engaging packaging",
						"Perfect for retail displays and seasonal promotions",
						"Long shelf life for optimal inventory management"
					]
				},
				conclusion: "Ideal for supermarkets, specialty stores, and seasonal retail displays. Contact us for bulk pricing and custom packaging options."
			}
		},
		recommendations: {
			title: "You Might Also Like",
			loading: "Loading recommendations..."
		}
	},
	sr: {
		meta: {
			title: "{{productTitle}} | SweetChoice"
		},
		gallery: {
			noImage: "Slika nije dostupna",
			viewImage: "Pogledajte {{index}} od {{total}}",
			imageCounter: "{{current}} / {{total}}"
		},
		info: {
			packageSize: {
				label: "Veličina Pakovanja",
				unit: "kutija"
			},
			shelfLife: {
				label: "Rok Trajanja",
				unit: "meseci"
			},
			availability: {
				available: "Dostupno za Narudžbu",
				outOfStock: "Trenutno Nema na Lageru"
			},
			weight: {
				label: "Težina Pakovanja"
			},
			features: {
				title: "Ključne Karakteristike",
				defaults: [
					"Premium Kvalitet",
					"Dugotrajnost",
					"Sezonsko Pakovanje"
				]
			},
			options: {
				title: "Opcije Proizvoda"
			},
			b2bNote: {
				title: "Samo B2B Prodaja:",
				description: "Kontaktirajte nas za veleprodajne cene, minimalne količine za narudžbu i opcije prilagođenog pakovanja."
			}
		},
		actions: {
			addToCatalog: "Dodaj u Katalog",
			addedToCatalog: "Dodato u Katalog",
			getCatalog: "Preuzmi Katalog",
			getFullCatalog: "Preuzmi Katalog →"
		},
		packaging: {
			title: "Opcije Pakovanja",
			pallet: {
				title: "Paletno Pakovanje",
				unitsPerPallet: "Jedinica po Paleti",
				transportBoxes: "Transportne Kutije"
			},
			transport: {
				title: "Transportna Kutija",
				unitsPerBox: "Jedinica po Kutiji"
			},
			commercial: {
				title: "Komercijalno Pakovanje",
				unitsPerPack: "Jedinica po Pakovanju"
			},
			alternative: "ili"
		},
		description: {
			title: "Detalji Proizvoda",
			placeholder: {
				title: "Premium Kvalitet Sezonskih Poslastica",
				intro: "Naš {{productName}} predstavlja savršen spoj tradicionalnog poslastičarskog majstorstva i modernih produkcijskih standarda. Svaki komad je pažljivo izrađen da pruži izuzetan ukus i vizuelnu privlačnost koja oduševljava kupce sezona za sezonom.",
				features: {
					title: "Ključne Karakteristike:",
					list: [
						"Premium sastojci od proverenih dobavljača",
						"Žive boje i privlačno pakovanje",
						"Savršeno za maloprodajne izloge i sezonske promocije",
						"Dugotrajan rok za optimalno upravljanje zalihama"
					]
				},
				conclusion: "Idealno za supermarkete, specijalizovane prodavnice i sezonske maloprodajne izloge. Kontaktirajte nas za veleprodajne cene i opcije prilagođenog pakovanja."
			}
		},
		recommendations: {
			title: "Možda Vas Zanima",
			loading: "Učitavanje preporuka..."
		}
	}
} as const;