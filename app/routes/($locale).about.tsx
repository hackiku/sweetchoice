// app/routes/($locale).about.tsx
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import Eyebrow from '~/components/ui/Eyebrow';
import ArrowButton from '~/components/ui/ArrowButton';
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import GalleryMasonry from '../components/ui/GalleryMasonry';

export const meta: MetaFunction = () => {
    return [{ title: `About us | Sweetchoice` }];
};

const videoData = {
    sources: [
        { mimeType: 'video/mp4', url: '/assets/choc-vid.mp4' },
        { mimeType: 'video/mp4', url: '/assets/tiktok.mp4' },
        { mimeType: 'video/mp4', url: '/assets/.mp4' },
        { mimeType: 'video/mp4', url: '/assets/FULL-choc-vid.mp4' },
    ],
};

export default function About() {
    const mockPrevPage = () => console.log('Previous page clicked');
    const mockNextPage = () => console.log('Next page clicked');

    // Populate the assets array with both images and videos
    const assets = [
        
        { type: 'video', src: '/assets/tiktok.mp4' },
		{ type: 'video', src: '/assets/tiktok.mp4' },
		{ type: 'video', src: '/assets/tiktok.mp4' },
		{ type: 'video', src: '/assets/tiktok.mp4' },
		{ type: 'video', src: '/assets/tiktok.mp4' },
		{ type: 'video', src: '/assets/tiktok.mp4' },
        // Add more assets here if needed
    ];

	return (
		<div>
			<div className='container mx-auto  px-4 about-bg'>
			<section className="md:w-5/6 space-y-2 mt-6 flex sm-max:m-0 lg-max:w-full">
				
			<div class="md:w-3/5 mb-4 flex flex-col lg-max:w-full"><h1 class=" text-7xl font-semibold max-w-lg leading-tight sm-max:text-3xl sm-max:mt-5 sm-max:mb-3 ">WE HAVE CANDY (and you know it)</h1><p class="text-2xl max-w-2xl leading-tight sm-max:text-base">Sweetchoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products. </p></div>
			<div className='about-cab sm-max:hidden md-max:hidden'>
				<img src="/assets/about-cap.png" alt="" />
			</div>
			</section>
			</div>
			
		
			

			<section className="relative mt-16 mb-16 sm-max:mt-8 sm-max:mb-8">
                <GalleryMasonry numAssets={assets.length} numTypes={3} assets={assets} />
                {/* <ArrowButton direction="left" onClick={mockPrevPage} bgColor="#FFA6F6" />
                <ArrowButton direction="right" onClick={mockNextPage} bgColor="#A6FAFF" /> */}
            </section>


		
			<div className='container mx-auto sm-max:px-4 md-max:px-4'>
			<section className='mb-16 sm-max:mt-16'>
				<h2 className='mb-8 sm-max:mb-2'>Our History</h2>
				
				<Timeline>
					<Timeline.Item>
						<Timeline.Point />
						<Timeline.Content className='sm-max:mb-5 sm-max:mt-5 '>
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
						<Timeline.Content className='sm-max:mb-5'>
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


			
			<section className='mb-16'>
				<div className="blurbs">
					<div className="blurb sm-max:w-full">
						<img src="/assets/graphics/choco-gradient.svg" alt="Buyback guarantee" />
						<h3><span className="highlight">Founded in 2013</span><div className='sm-max:text-lg'>as a family business</div></h3>
					</div>
					<div className="blurb">
						<img src="/assets/graphics/choco-grad-2.svg" alt="Promotional Support" />
						<h3><span className="highlight">Fastest growing</span><div className='sm-max:text-lg'> sweets & confectionery company in the Balkans</div></h3>
					</div>
					<div className="blurb">
						<img src="/assets/graphics/choco-gradient.svg" alt="Custom Terms" />
						<h3><span className="highlight">120+ B2B</span> <div className='sm-max:text-lg'>partners</div></h3>
					</div>
				</div>
			</section>

			


			<section className='mb-12'>
				<h2>Our Mission</h2>
				<p>
					We aim to build and maintain efficient, transparent, and long-term relations with all our business partners.
					Our client list includes major supermarket chains and a large number of small retailers in Serbia and abroad.
				</p>
			</section>
			


			<section className='mb-12'>
				<h2>Our Team</h2>
				<p>
					Meet the passionate team behind Sweetchoice. We are dedicated to delivering the best chocolate treats for your holidays.
				</p>
			</section>
			</div>
		</div>
	);
}
