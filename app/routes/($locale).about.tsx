// app/routes/($locale).about.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Video } from '@shopify/hydrogen';
import { Hero } from '~/components/Hero';
import '../styles/home-hero.css';
import '../styles/pages/about.css';

export const meta: MetaFunction = () => {
	return [{ title: `About us | Sweetchoice` }];
};

const videoData = {
	sources: [
		{
			mimeType: 'video/mp4',
			url: '/assets/choc-vid.mp4',
		},
	],
};

export default function About() {
	return (
		<div>
			<section className="hero">
				<h1>We make the holidays sweeter</h1>
				<p>Learn more about Sweetchoice and our journey.</p>
			</section>

			<section className="video-section">
				<Video data={videoData} autoPlay muted loop playsInline />
			</section>

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
			</section>
		</div>
	);
}
