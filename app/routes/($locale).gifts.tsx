// app/routes/($locale).gifts.tsx

import React from 'react';
import { MetaFunction } from '@remix-run/react';
import ComingSoon from '~/components/ComingSoon';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Gifts | SweetChoice' },
		{ name: 'description', content: 'Exciting gift options coming soon to SweetChoice!' },
	];
};

export default function GiftsPage() {
	return (
		<ComingSoon
			title="Gift Pack Sugar Rush"
			description="Stay tuned for our first direct to consumer e-store. Send sweet bundles of joy to loved ones at home or at work."
		/>
	);
}