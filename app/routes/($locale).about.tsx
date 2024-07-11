// app/routes/($locale).about.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Video } from '@shopify/hydrogen';
import { Hero } from '~/components/Hero';


export const meta: MetaFunction = () => {
	return [{ title: `About us | Sweetchoice` }];
};

const videoData = {
	sources: [
		{
			// mimeType: 'video/webp',
			// url: '/assets/choc-vid.webp',
			mimeType: 'video/mp4',
			url: '/assets/choc-vid.mp4',
		},
	],
};


// ------------------ ABOUT PAGE ------------------

export default function About() {
	return (
		<div>
			<Hero
				title="We make the holidays sweeter"
				paragraph="Learn more about Sweetchoice and our journey."
				buttonLabel="Contact Us"
				// backgroundImage="assets/trees-drawing.png"
				slotContent={<img src="assets/tree-drawing.png" alt="About sweetchoice" />}
			/>

			<section>
				<h2>Our History</h2>
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
				{/* <Image data={image} sizes="100vw" /> */}
				{/* <Image
					data={{
						altText: 'Sweetchoice Team',
						url: 'assets/team-photo.jpg',
						width: 800,
						height: 600,
					}}
				/> */}
			</section>

			<section>
				<Video data={videoData} autoPlay muted loop playsInline />
			</section>
			
		</div>
	);
}
