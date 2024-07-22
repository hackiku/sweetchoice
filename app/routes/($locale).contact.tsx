// app/routes/($locale).contact.tsx

import { type MetaFunction } from '@remix-run/react';
import SeasonsWheel from '~/components/seasons/SeasonsWheel';
import SeasonsSection from '~/components/seasons/SeasonsSection'
import Logos from '../components/ui/Logos';
import Button from '../components/ui/Button';
// import '../styles/pages/holidays.css';

export const meta: MetaFunction = () => {
	return [{ title: `Holidays | Sweetchoice` }];
};

export default function Holidays() {
	return (
		<div>
			<section className="hero">
				<h1>Contact</h1>
			</section>

			<hr />

			<section>
				<h1>Our story</h1>
			</section>
		</div>

	);
}
