// app/routes/($locale).holidays.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Video } from '@shopify/hydrogen';
import Eyebrow from '~/components/ui/Eyebrow';
import SeasonsWheel from '~/components/seasons/SeasonsWheel';

import '../styles/pages/holidays.css';

export const meta: MetaFunction = () => {
    return [{ title: `Holidays | Sweetchoice` }];
};

export default function Holidays() {
    return (
        <div>
            <section className="hero">
                {/* <Eyebrow title="Holiday" /> */}
                <h1>Treats & Sweets for Every Season</h1>
                {/* <p>Come to the sweet side.</p> */}
            </section>

            <hr />


						{/* seasons ======================== */}

						<section id="winter">
							<Eyebrow title="{current season}" />
							<h2>Christmas & New Year</h2>
							<p>Winter treats and sweets.</p>
						</section>

            <hr />
						
            <section id="spring">
								<div className='season-pill'> 
									<Eyebrow title="spring" />
								</div>

                <h2>Saint Valentine's</h2>
                <p>Sweet love's in the air.</p>
								
            </section>

            <hr />

            <section id="summer">
								<Eyebrow title="{current season}" />
                <h2>/</h2>
                <p>Summer treats and sweets.</p>
            </section>

            <hr />

            <section id="autumn">
                <h2>Autumn</h2>
                <p>Autumn treats and sweets.</p>
            </section>

            <hr />

            <section id="winter">
                <h2>Winter</h2>
                <p>Winter treats and sweets.</p>
            </section>

            <hr />

            <section>
                <h2>Stats</h2>
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
                        <h3><span class="highlight">120+ B2B</span> partners</h3>
                    </div>
                </div>
            </section>

            <SeasonsWheel />
        </div>
    );
}
