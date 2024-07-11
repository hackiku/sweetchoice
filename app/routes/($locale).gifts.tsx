// app/routes/($locale).gifts.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
// import { Image, Video } from '@shopify/hydrogen';
import { Hero } from '~/components/Hero';


export const meta: MetaFunction = () => {
	return [{ title: `About us | Sweetchoice` }];
};



// ------------------ ABOUT PAGE ------------------

export default function About() {
	return (
		<div>
			<Hero
				title="Gift programs"
				paragraph="Make someone's day sweeter."
				buttonLabel="Contact Us"
				// backgroundImage="assets/trees-drawing.png"
				// slotContent={<img src="assets/tree-drawing.png" alt="About sweetchoice" />}
			/>

			<section>
				<h2>gifty</h2>
				<p>
					Sweetchoice is a growing company that distributes chocolate things crafted with love.
					We are highly specialized in New Year’s and Easter programs, so whatever holiday treat you might need, we got it.
				</p>
				<p>
					In October 2013, Vesko’s sons Stanko and Vuk founded Sweetchoice, a company that honors the sweet passion they were raised in, but with the latest standards of industry excellence, innovation, and tech-savviness.
				</p>
				<p>
					<strong>Statistics:</strong>
					<ul>
						<li>Founded: 2013</li>
						<li>Employees: 50+</li>
						<li>Clients: 100+ B2B partners</li>
						<li>Products: 200+ chocolate items</li>
					</ul>
				</p>
			</section>

		</div>
	);
}
