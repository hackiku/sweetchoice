// app/lib/i18n/translations/components/contact.ts

export const contact = {
	en: {
		buttons: {
			talkBiz: 'Talk Biz',
			openContact: 'Contact Us',
			closeContact: 'Close Contact',
			removeAll: 'Remove All',
			submit: 'Submit',
			getQuote: 'Get Quote',
			getCatalog: 'Get Catalog'
		},
		form: {
			title: 'CONTACT & CATALOG',
			name: {
				label: 'Name',
				placeholder: 'Willie Wonka'
			},
			email: {
				label: 'Email',
				placeholder: 'willie@disney.com'
			},
			message: {
				label: 'Message',
				placeholder: "What's on your mind?"
			}
		},
		catalog: {
			title: 'Selected Products',
			empty: 'No products selected yet',
			emptyDesc: 'Browse our catalog and click "Add to Catalog" to start building your selection'
		},
		contact: {
			title: 'Contact Details',
			email: 'info@sweetchoice.com',
			phone: '+381 11 123 4567',
			location: 'Belgrade, Serbia'
		}
	},
	sr: {
		buttons: {
			talkBiz: 'Saradnja',
			openContact: 'Kontaktirajte Nas',
			closeContact: 'Zatvori',
			removeAll: 'Ukloni Sve',
			submit: 'Pošalji',
			getQuote: 'Zatraži Ponudu',
			getCatalog: 'Preuzmi Katalog'
		},
		form: {
			title: 'KONTAKT & KATALOG',
			name: {
				label: 'Ime',
				placeholder: 'Vili Vonka'
			},
			email: {
				label: 'Email',
				placeholder: 'vili@disney.com'
			},
			message: {
				label: 'Poruka',
				placeholder: 'Vaša poruka...'
			}
		},
		catalog: {
			title: 'Izabrani Proizvodi',
			empty: 'Još uvek nema izabranih proizvoda',
			emptyDesc: 'Pregledajte naš katalog i kliknite "Dodaj u Katalog" da počnete sa izborom'
		},
		contact: {
			title: 'Kontakt Podaci',
			email: 'info@sweetchoice.com',
			phone: '+381 11 123 4567',
			location: 'Beograd, Srbija'
		}
	}
} as const;