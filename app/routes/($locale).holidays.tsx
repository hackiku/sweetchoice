// app/routes/($locale).holidays.tsx

import { type MetaFunction } from '@remix-run/react';
import SeasonsWheel from '~/components/seasons/SeasonsWheel';
import SeasonsSection from '~/components/seasons/SeasonsSection';

export const meta: MetaFunction = () => {
	return [{ title: `Holidays | Sweetchoice` }];
};

export default function Holidays() {
	return (
		<div>
			<section className="hero">
				<h1>Treats & Sweets for Every Season</h1>
			</section>

			{/* <hr /> */}

			<SeasonsSection />
			
			<SeasonsWheel />

			<section>
				<h1>Our story</h1>
			</section>
		</div>
	);
}
