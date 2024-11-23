// app/lib/i18n/translations/components/holidays.ts

// app/lib/i18n/translations/components/holidays.ts

export const holidays = {
	en: {
		holidays: {
			christmas: {
				name: 'Christmas',
				title: 'Christmas Sweets',
				description: 'Discover our festive collection of Christmas treats. From traditional favorites to unique holiday specialties.',
				exploreButton: 'Explore Christmas Collection'
			},
			valentines: {
				name: "Valentine's Day",
				title: 'Sweet Love',
				description: 'Share the love with our special Valentine\'s Day collection.Perfect for romantic gestures and heartfelt moments.',
        exploreButton: 'Explore Valentine\'s Collection'
      },
			easter: {
				name: 'Easter',
				title: 'Easter Delights',
				description: 'Celebrate spring with our Easter collection. Colorful treats and traditional Easter favorites.',
				exploreButton: 'Explore Easter Collection'
			},
			halloween: {
				name: 'Halloween',
				title: 'Spooky Treats',
				description: 'Get spooky with our Halloween collection. Fun and frightfully delicious treats for all ages.',
				exploreButton: 'Explore Halloween Collection'
			}
		},
		productGrid: {
			exploreAll: 'View all {{holiday}} products'
		}
	},
	sr: {
		holidays: {
			christmas: {
				name: 'Božić',
				title: 'Božićne Poslastice',
				description: 'Otkrijte našu prazničnu kolekciju božićnih poslastica. Od tradicionalnih favorita do jedinstvenih prazničnih specijaliteta.',
				exploreButton: 'Istražite Božićnu Kolekciju'
			},
			valentines: {
				name: 'Dan Zaljubljenih',
				title: 'Slatka Ljubav',
				description: 'Podelite ljubav sa našom posebnom kolekcijom za Dan zaljubljenih. Savršeno za romantične gestove i trenutke pune emocija.',
				exploreButton: 'Istražite Valentinovu Kolekciju'
			},
			easter: {
				name: 'Uskrs',
				title: 'Uskršnje Radosti',
				description: 'Proslavite proleće sa našom uskršnjom kolekcijom. Šarene poslastice i tradicionalni uskršnji favoriti.',
				exploreButton: 'Istražite Uskršnju Kolekciju'
			},
			halloween: {
				name: 'Noć Veštica',
				title: 'Strašne Poslastice',
				description: 'Uživajte u našoj kolekciji za Noć veštica. Zabavne i zastrašujuće ukusne poslastice za sve uzraste.',
				exploreButton: 'Istražite Halloween Kolekciju'
			}
		},
		productGrid: {
			exploreAll: 'Pogledajte sve {{holiday}} proizvode'
		}
	}
} as const;