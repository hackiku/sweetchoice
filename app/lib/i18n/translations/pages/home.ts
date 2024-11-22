// app/lib/i18n/translations/pages/home.ts

export const home = {
	en: {
		meta: {
			title: 'SweetChoice | Home'
		},
		hero: {
			headingTop: 'Sweet holidays',
			headingBottom: 'all year long',
			subheading: 'We wholesale wholesome holiday treats to supermarkets large and small.',
			ctaText: 'Get Catalog →',
			ctaLink: '/collections/all',
			secondaryButtonText: 'Shop all →',
			secondaryButtonLink: '/about'
		},
		holidaySection: {
			title: 'Seasonal Treats',
			subtitle: 'Explore our holiday collections',
			holidays: {
				christmas: 'Christmas',
				valentines: 'Valentine\'s Day',
				easter: 'Easter',
				halloween: 'Halloween'
			}
		},
		blurbs: {
			title: 'Sweet choices in numbers',
			items: [
				{
					number: '11+',
					text: 'Years holiday distributor',
					bgColor: '#FFD700'
				},
				{
					number: '16+',
					text: 'Partnering countries across Europe',
					bgColor: '#FF69B4'
				},
				{
					number: '2.1M+',
					text: 'Unique treats sold every year',
					bgColor: '#00CED1'
				}
			]
		},
		footer: {
			copyright: '© 2023 SweetChoice. All rights reserved.'
		}
	},
	sr: {
		meta: {
			title: 'SweetChoice | Početna'
		},
		hero: {
			headingTop: 'Slatki praznici',
			headingBottom: 'cele godine',
			subheading: 'Veleprodaja zdravih prazničnih poslastica za velike i male supermarkete.',
			ctaText: 'Preuzmi katalog →',
			ctaLink: '/collections/all',
			secondaryButtonText: 'Prodavnica →',
			secondaryButtonLink: '/o-nama'
		},
		holidaySection: {
			title: 'Sezonske poslastice',
			subtitle: 'Istražite naše praznične kolekcije',
			holidays: {
				christmas: 'Božić',
				valentines: 'Dan zaljubljenih',
				easter: 'Uskrs',
				halloween: 'Noć veštica'
			}
		},
		blurbs: {
			title: 'Slatki izbori u brojevima',
			items: [
				{
					number: '11+',
					text: 'Godina kao praznični distributer',
					bgColor: '#FFD700'
				},
				{
					number: '16+',
					text: 'Partnerskih zemalja širom Evrope',
					bgColor: '#FF69B4'
				},
				{
					number: '2.1M+',
					text: 'Jedinstvenih poslastica prodatih svake godine',
					bgColor: '#00CED1'
				}
			]
		},
		footer: {
			copyright: '© 2023 SweetChoice. Sva prava zadržana.'
		}
	}
} as const;

