import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ArrowButton = ({ className, style, onClick, direction }) => (
    <button
        className={`arrow-button absolute top-1/2 transform -translate-y-1/2 ${className}`}
        style={{
            ...style,
            backgroundColor: direction === 'right' ? '#A6FAFF' : '#FFA6F6',
            borderRadius: '50%',
            width: '6%',
            height: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1, // Ensure it is above other elements
        }}
        onClick={onClick}
    >
        {direction === 'right' ? '→' : '←'}
    </button>
);


const GalleryMasonry = ({ assets }) => {
    const [Slider, setSlider] = useState(null);

    useEffect(() => {
        import('react-slick').then((module) => {
            setSlider(() => module.default);
        });
    }, []);

    if (!Slider) {
        return <p>Loading...</p>;
    }

    const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: <ArrowButton direction="left" className="left-8 p-8" />,
		nextArrow: <ArrowButton direction="right" className="right-8 p-8" />,
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    arrows: false 
                }
            }
        ]
	};
	

    return (
		<div className='container mx-auto'>
        <div className="slider-container relative px-4">
        <Slider {...sliderSettings}>
                {assets.map((asset, index) => (
					
                    <div key={index} className="slider-item">
                        <div className='flex justify-between gap-9 sm-max:gap-3'>
                        <div className='video w-2/6 sm-max:w-full'>
                            <div className='mb-7 h-[514px] sm-max:h-full sm-max:mb-2.5 '>
                            <img src='rect-placeholder.png' className='h-full w-full max-w-full'/>
                            </div>
                            <div className='flex'>
                                <div className='h-[155px] sm-max:h-full'>
                                <img src='rect-placeholder.png' className='h-full w-full max-w-full' />
                                </div>
                                <div className='ml-10 sm-max:ml-2 h-[155px] sm-max:h-full '>
                                <img src='rect-placeholder.png' className='h-full w-full max-w-full'/>
                                </div>
                            </div>
                     
                        </div>
                        <div className='video h-[699px] w-[395px] sm-max:h-full sm-max:w-full'>
                        {asset.type === 'video' && (
                            <video
                                className="max-w-full rounded-lg  "
                                controls
                                autoPlay
                                muted
                            >
                                <source src={asset.src} type="video/mp4" className='w-full h-full' />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        </div>
                        <div className='video w-2/6 sm-max:w-full'>
                            
                            <div className='flex'>
                                <div className='mb-7 h-[155px] sm-max:h-full sm-max:mb-2.5 '>
                                <img src='rect-placeholder.png' className='h-full w-full max-w-full'/>
                                </div>
                                <div className='mb-7 ml-10 h-[155px] sm-max:h-full sm-max:ml-2 sm-max:mb-2.5'>
                                <img src='rect-placeholder.png' className='h-full w-full max-w-full'/>
                                </div>
                            </div>
                            <div className='h-[514px] sm-max:h-full'>
                            <img src='rect-placeholder.png' className='h-full w-full max-w-full'/>
                            </div>
                     
                        </div>
                    </div>

                    </div>
                ))}
            </Slider>
        </div>
		</div>
    );
};

export default GalleryMasonry;
