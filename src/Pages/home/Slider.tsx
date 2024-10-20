import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './slider.css';
import banner1 from '../../assets/banner/banner1.webp';
import banner2 from '../../assets/banner/banner2.webp';
import banner3 from '../../assets/banner/banner3.avif';
import banner4 from '../../assets/banner/b3.webp';
import banner5 from '../../assets/banner/banner1.webp';

const Slider = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation,Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={banner4} alt="banner" className="cursor-pointer" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner1} alt="banner" className="cursor-pointer" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner2} alt="banner" className="cursor-pointer" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner3} alt="banner" className="cursor-pointer" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner5} alt="banner" className="cursor-pointer" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
