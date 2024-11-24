// Auto-generated index.ts for translations
import {nav} from './translations/components/nav';
import {about} from './translations/pages/about';
import {home} from './translations/pages/home';
import {gifts} from './translations/pages/gifts';
import {holidays} from './translations/pages/holidays';
import {collections} from './translations/pages/collections';
import {footer} from './translations/components/footer';
import {header} from './translations/components/header';
import {contact} from './translations/components/contact';
import {statBlurbs} from './translations/components/statBlurbs';
import {comingsoon} from './translations/pages/comingsoon';
import {common} from './translations/common';

export const translations = {
  en: {
    nav: nav.en,
    about: about.en,
    home: home.en,
    gifts: gifts.en,
    holidays: holidays.en,
    collections: collections.en,
    footer: footer.en,
    header: header.en,
    contact: contact.en,
    statBlurbs: statBlurbs.en,
    comingsoon: comingsoon.en,
    common: common.en
  },
  sr: {
		nav: nav.sr,
		about: about.sr,
    home: home.sr,
    gifts: gifts.sr,
    holidays: holidays.sr,
    collections: collections.sr,
    footer: footer.sr,
    header: header.sr,
    contact: contact.sr,
    statBlurbs: statBlurbs.sr,
    comingsoon: comingsoon.sr,
    common: common.sr
  }
} as const;

export type Translations = typeof translations;
export type Language = keyof typeof translations;