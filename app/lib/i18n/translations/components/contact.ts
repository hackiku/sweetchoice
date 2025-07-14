// app/lib/i18n/translations/components/contact.ts

export const contact = {
	en: {
		buttons: {
			talkBiz: 'Get Catalog',
			openContact: 'Contact Us',
			closeContact: 'Close Contact',
			removeAll: 'Remove All',
			submit: 'Submit',
			submitting: 'Submitting...',
			getQuote: 'Get Quote',
			getCatalog: 'Get Catalog',
			contactPage: 'Contact Page'
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
			},
			success: {
				withProducts: 'Catalog saved & headed your way. Chat soon!',
				noProducts: "Great! Catalog\'s on your way. Chat soon"
			}
		},
		catalog: {
			title: 'Selected Products',
			empty: 'No products selected yet',
			emptyDesc: 'Browse our catalog and click "Add to Catalog" to start building your selection'
		},
		contactDetails: {
			title: 'Contact Details',
			email: 'info@sweetchoice.com',
			phone: '+381 11 123 4567',
			location: 'Belgrade, Serbia',
			address: {
				mainLine: 'Nemanjina 7',
				secondaryLines: {
					city: '11080 Belgrade',
					country: 'Serbia'
				},
				details: {
					pib: 'Tax number - 108257834',
					mb: 'Registration - 20963026'
				}
			}
		},
		newsletter: {
			title: "Newsletter",
			placeholder: "Enter your email",
			buttonText: "Subscribe",
			comingSoon: {
				message: "Newsletter coming soon! Meanwhile, contact",
				email: "info@sweetchoice.rs"
			}
		}
	},
	sr: {
		buttons: {
			talkBiz: 'Saradnja',
			openContact: 'Kontaktirajte Nas',
			closeContact: 'Zatvori',
			removeAll: 'Ukloni Sve',
			submit: 'Pošalji',
			submitting: 'Na putu...',
			getQuote: 'Zatraži Ponudu',
			getCatalog: 'Uzmi Katalog',
			contactPage: 'Kontakt Stranica'
		},
		form: {
			title: 'KONTAKT & KATALOG',
			name: {
				label: 'Ime',
				placeholder: 'Vili Vonka'
			},
			email: {
				label: 'Email',
				placeholder: 'vili@disney.rs'
			},
			message: {
				label: 'Poruka',
				placeholder: 'Vaša poruka...'
			},
			success: {
				withProducts: 'Katalog sačuvan i poslat. Čujemo se!',
				noProducts: "Standardni katalog poslat. Na vezi smo!"
			}
		},
		catalog: {
			title: 'Izabrani Proizvodi',
			empty: 'Još uvek nema izabranih proizvoda',
			emptyDesc: 'Pregledajte naš katalog i kliknite "Dodaj u Katalog" da počnete sa izborom'
		},
		contactDetails: {
			title: 'Kontakt Podaci',
			email: 'info@sweetchoice.com',
			phone: '+381 11 123 4567',
			location: 'Beograd, Srbija',
			address: {
				mainLine: 'Nemanjina 7',
				secondaryLines: {
					city: '11080 Beograd',
					country: 'Srbija'
				},
				details: {
					pib: 'PIB - 108257834',
					mb: 'MB - 20963026'
				}
			}
		},
		newsletter: {
			title: "Bilten",
			placeholder: "Unesite email",
			buttonText: "Prijavi se",
			comingSoon: {
				message: "Mejl ponude u izgradnji! U međuvremenu, kontaktirajte",
				email: "info@sweetchoice.rs"
			}
		}
	}
} as const;