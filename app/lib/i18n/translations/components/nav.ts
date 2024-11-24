// app/lib/i18n/translations/components/nav.ts

export const nav = {
	en: {
		menu: {
			home: 'Home',
			holidays: 'Holidays',
			allYear: 'All Products',
			gifts: 'Gifts',
			about: 'About',
		},
		buttons: {
			menu: {
				open: 'Menu',
				close: 'Close Menu'
			},
			language: {
				sr: 'SR',
				en: 'EN'
			}
		},
		holidays: {
			title: 'Holidays',
			christmas: 'Christmas',
			valentines: "Valentine's Day",
			easter: 'Easter',
			halloween: 'Halloween'
		}
	},
	sr: {
		menu: {
			home: 'Početna',
			holidays: 'Praznici',
			allYear: 'Svi proizvodi',
			gifts: 'Pokloni',
			about: 'O Nama',
		},
		buttons: {
			menu: {
				open: 'Meni',
				close: 'Zatvori Meni'
			},
			language: {
				sr: 'СР',
				en: 'ЕН'
			}
		},
		holidays: {
			title: 'Praznici',
			christmas: 'Božić',
			valentines: 'Dan Zaljubljenih',
			easter: 'Uskrs',
			halloween: 'Noć Veštica'
		}
	}
} as const;