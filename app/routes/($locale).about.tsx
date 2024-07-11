// app/routes/($locale).about.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Hero } from '~/components/Hero';

export const meta: MetaFunction = () => {
	return [{ title: `About us | Sweetchoice` }];
};

export default function About() {
	return (
		<div>
			<Hero
				title="About Us"
				paragraph="Learn more about Sweetchoice and our journey."
				buttonLabel="Contact Us"
				backgroundImage="path/to/background.jpg" // Update with actual path if any
				slotContent={<img src="path/to/image.jpg" alt="About us" />} // Update with actual path if any
			/>
			<section>
				<h2>Our History</h2>
				<p>
					Sweetchoice is a growing company that distributes chocolate things crafted with love.
					We are highly specialized in New Year’s and Easter programs, so whatever holiday treat you might need, we got it.
				</p>
			</section>
			<section>
				<h2>Our Mission</h2>
				<p>
					We aim to build and maintain efficient, transparent, and long-term relations with all our business partners.
					Our client list includes major supermarket chains and a large number of small retailers in Serbia and abroad.
				</p>
			</section>
			<section>
				<h2>Our Team</h2>
				<p>
					Meet the passionate team behind Sweetchoice. We are dedicated to delivering the best chocolate treats for your holidays.
				</p>
			</section>
		</div>
	);
}
