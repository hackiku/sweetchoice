// app/routes/($locale).holidays.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Image, Video } from '@shopify/hydrogen';
import Eyebrow from '~/components/ui/Eyebrow';
import SeasonsWheel from '~/components/seasons/SeasonsWheel';
import SeasonsSection from '~/components/seasons/SeasonsSection';

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

						<SeasonsSection />

            <SeasonsWheel />
        </div>
    );
}
