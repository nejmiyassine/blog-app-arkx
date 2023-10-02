import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const ImageSlider = ({ images }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className='absolute top-0 bottom-0 w-full h-full bg-black/30 z-[20]'></div>
                    <div className='absolute top-[50%] left-[50%] text-white z-[100] -translate-y-1/2 -translate-x-1/2 text-center'>
                        <h2 className='text-5xl font-bold'>
                            Dive into the Online World.
                        </h2>
                        <p className='py-5'>
                            Welcome to DigitalDive – Where the Digital World
                            Awaits!
                        </p>
                        <button className='uppercase border p-3 hover:bg-white hover:text-black transition ease-out'>
                            start reading
                        </button>
                    </div>
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className='relative w-full h-[95vh] object-cover'
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
};

export default ImageSlider;
