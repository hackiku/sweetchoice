// app/routes/($locale).about.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Video } from '@shopify/hydrogen';
import Eyebrow from '~/components/ui/Eyebrow';
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import GalleryMasonry from '../components/ecom/GalleryMasonry';


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
			<section className="md:w-5/6 lg:w-3/6 space-y-2 mt-6">
				<Eyebrow text="About us" className='text-black w-24' />
				<h1 className='text-5xl uppercase font-normal'>We Have Candy (And You Know It)</h1>
			
			</section>
			
			<hr className='border-[0.06em]'/>

			
			{/* ----------------------------------------------------- */}

			<GalleryMasonry />

			{/* ----------------------------------------------------- */}
			<section className='px-20 mt-12'>
				<h2 className='mb-8'>Our History</h2>
				
				<Timeline>
					<Timeline.Item>
						<Timeline.Point />
						<Timeline.Content>
							<Timeline.Time>February 2022</Timeline.Time>
							<Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
							<Timeline.Body>
								Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
								E-commerce & Marketing pages.
							</Timeline.Body>
							<Button color="gray">
								Learn More
								<HiArrowNarrowRight className="ml-2 h-3 w-3" />
							</Button>
						</Timeline.Content>
					</Timeline.Item>
					<Timeline.Item>
						<Timeline.Point />
						<Timeline.Content>
							<Timeline.Time>March 2022</Timeline.Time>
							<Timeline.Title>Marketing UI design in Figma</Timeline.Title>
							<Timeline.Body>
								All of the pages and components are first designed in Figma and we keep a parity between the two versions
								even as we update the project.
							</Timeline.Body>
						</Timeline.Content>
					</Timeline.Item>
					<Timeline.Item>
						<Timeline.Point />
						<Timeline.Content>
							<Timeline.Time>April 2022</Timeline.Time>
							<Timeline.Title>E-Commerce UI code in Tailwind CSS</Timeline.Title>
							<Timeline.Body>
								Get started with dozens of web components and interactive elements built on top of Tailwind CSS.
							</Timeline.Body>
						</Timeline.Content>
					</Timeline.Item>
				</Timeline>

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
