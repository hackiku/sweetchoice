// app/routes/($locale).gifts.tsx

import React from 'react';
import { MetaFunction } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';
import ComingSoon from '~/components/ComingSoon';

export const meta: MetaFunction = () => {
	const { t } = useTranslation();

	return [
		{ title: t('comingsoon.meta.title') },
		{ name: 'description', content: t('comingsoon.meta.description') }
	];
};

export default function GiftsPage() {
	const { t } = useTranslation();

	return (
		<ComingSoon
			title={t('comingsoon.headline')}
			description={t('comingsoon.description')}
		/>
	);
}