// Auto-generated index.ts for translations
import {common} from './translations/common';
// components
import {nav} from './translations/components/nav';
import {footer} from './translations/components/footer';
import {header} from './translations/components/header';
import {contact} from './translations/components/contact';
import {statBlurbs} from './translations/components/statBlurbs';
// pages
import {about} from './translations/pages/about';
import {home} from './translations/pages/home';
import {gifts} from './translations/pages/gifts';
import {holidays} from './translations/pages/holidays';
import {collections} from './translations/pages/collections';
import {comingsoon} from './translations/pages/comingsoon';
import {contactPage} from './translations/pages/contactPage';

export const translations = {
  en: {
    common: common.en,
    nav: nav.en,
    about: about.en,
    home: home.en,
    gifts: gifts.en,
    holidays: holidays.en,
    collections: collections.en,
		contactPage: contactPage.sr,
    footer: footer.en,
    header: header.en,
    contact: contact.en,
    statBlurbs: statBlurbs.en,
    comingsoon: comingsoon.en,
  },
  sr: {
    common: common.sr,
		nav: nav.sr,
		about: about.sr,
    home: home.sr,
    gifts: gifts.sr,
    holidays: holidays.sr,
    collections: collections.sr,
		contactPage: contactPage.sr,
    footer: footer.sr,
    header: header.sr,
    contact: contact.sr,
    statBlurbs: statBlurbs.sr,
    comingsoon: comingsoon.sr,
  }
} as const;

export type Translations = typeof translations;
export type Language = keyof typeof translations;