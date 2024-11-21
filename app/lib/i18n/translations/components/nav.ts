// app/lib/i18n/translations/components/nav.ts

export const nav = {
	en: {
		menu: {
			holidays: 'Holidays',
			allYear: 'All Year',
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
			christmas: 'Christmas',
			valentines: "Valentine's Day",
			easter: 'Easter',
			halloween: 'Halloween'
		}
	},
	sr: {
		menu: {
			holidays: 'Praznici',
			allYear: 'Tokom Godine',
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
			christmas: 'Božić',
			valentines: 'Dan Zaljubljenih',
			easter: 'Uskrs',
			halloween: 'Noć Veštica'
		}
	}
} as const;