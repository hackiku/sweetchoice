
// lib/i18n/translations.ts
export const translations = {
	en: {
		about: {
			meta: {
				title: 'About us | SweetChoice'
			},
			hero: {
				label: 'About Us',
				heading: 'WE HAVE CANDY',
				subheading: '(and you know it)'
			},
			intro: {
				description: 'SweetChoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery',
				secondary: "You've probably seen our sweets in your local supermarkets when the holidays are hot."
			},
			stats: {
				yearFounded: {
					number: '2013',
					label: 'Year SweetChoice was founded'
				},
				countries: {
					number: '15+',
					label: 'Countries we distribute to'
				},
				products: {
					number: '200+',
					label: 'Unique seasonal products'
				}
			},
			cta: {
				button: 'Talk Business →'
			}
		},
		    stats: {
      about: {
        yearFounded: {
          number: '2013',
          label: 'Year founded'
        },
        countries: {
          number: '16+',
          label: 'Partner countries'
        },
        products: {
          number: '2.1M+',
          label: 'Unique treats per year'
        }
      },
      home: {
        yearsFounded: {
          number: '10+',
          label: 'Years sweetening holidays across Europe'
        },
        partners: {
          number: '100+',
          label: 'B2B partners trusting our sweet offerings'
        },
        smiles: {
          number: '1M+',
          label: 'Smiles delivered through our holiday treats'
        }
      }
    }
	},
	sr: {
		about: {
			meta: {
				title: 'O nama | SweetChoice'
			},
			hero: {
				label: 'O Nama',
				heading: 'IMAMO SLATKIŠE',
				subheading: '(i to vam je jasno)'
			},
			intro: {
				description: 'SweetChoice je jedina kompanija u jugoistočnoj Evropi specijalizovana za uvoz i distribuciju sezonskih konditorskih proizvoda',
				secondary: 'Verovatno ste videli naše slatkiše u lokalnim supermarketima i prodavnicama tokom praznika.'
			},
			stats: {
				yearFounded: {
					number: '2013',
					label: 'Godina osnivanja SweetChoice-a'
				},
				countries: {
					number: '15+',
					label: 'Zemalja u koje distribuiramo'
				},
				products: {
					number: '200+',
					label: 'Jedinstvenih sezonskih proizvoda'
				}
			},
			cta: {
				button: 'Razgovarajmo o poslu →'
			}
		},
		stats: {
			about: {
				yearFounded: {
					number: '2013',
					label: 'Godina osnivanja'
				},
				countries: {
					number: '16+',
					label: 'Partnerskih zemalja'
				},
				products: {
					number: '2.1M+',
					label: 'Jedinstvenih poslastica godišnje'
				}
			},
			home: {
				yearsFounded: {
					number: '10+',
					label: 'Godina zaslađivanja praznika širom Evrope'
				},
				partners: {
					number: '100+',
					label: 'B2B partnera koji veruju našim slatkim ponudama'
				},
				smiles: {
					number: '1M+',
					label: 'Osmeha isporučenih kroz naše praznične poslastice'
				}
			}
		}
	}
} as const;

export type Translations = typeof translations;
export type Language = keyof typeof translations;