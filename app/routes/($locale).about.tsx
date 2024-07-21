// app/routes/($locale).about.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Video } from '@shopify/hydrogen';
import Eyebrow from '~/components/ui/Eyebrow';

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
				<Eyebrow title="About us" />
				<h1>We Have Candy</h1>
				<p>Come to the sweet side.</p>
			</section>

			<section className="video-section">
				<Video data={videoData} autoPlay muted loop playsInline />
			</section>
			
			{/* ----------------------------------------------------- */}

			<section>
				<h2>Our History</h2>
				<p>
					Sweetchoice is a growing company that distributes chocolate things crafted with love.
					We are highly specialized in New Year’s and Easter programs, so whatever holiday treat you might need, we got it.
				</p>
				<p>
					In October 2013, Vesko’s sons Stanko and Vuk founded Sweetchoice, a company that honors the sweet passion they were raised in, but with the latest standards of industry excellence, innovation, and tech-savviness.
				</p>
			</section>

			{/* ----------------------------------------------------- */}
			
			<section>
				<div className="blurbs">
					<div className="blurb">
						<img src="/assets/graphics/choco-gradient.svg" alt="Buyback guarantee" />
						<h3><span className="highlight">Founded in 2013</span> as a family business</h3>
					</div>
					<div className="blurb">
						<img src="/assets/graphics/choco-grad-2.svg" alt="Promotional Support" />
						<h3><span className="highlight">Fastest growing</span> sweets & confectionery company in the Balkans</h3>
					</div>
					<div className="blurb">
						<img src="/assets/graphics/choco-gradient.svg" alt="Custom Terms" />
						<h3><span className="highlight">120+ B2B</span> partners</h3>
					</div>
				</div>
			</section>

			
			{/* ----------------------------------------------------- */}

			<section>
				<h2>Our Mission</h2>
				<p>
					We aim to build and maintain efficient, transparent, and long-term relations with all our business partners.
					Our client list includes major supermarket chains and a large number of small retailers in Serbia and abroad.
				</p>
			</section>
			
			{/* ----------------------------------------------------- */}

			<section>
				<h2>Our Team</h2>
				<p>
					Meet the passionate team behind Sweetchoice. We are dedicated to delivering the best chocolate treats for your holidays.
				</p>
			</section>
		</div>
	);
}
