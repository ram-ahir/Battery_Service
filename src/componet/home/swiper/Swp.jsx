import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import './Swpstyle.css';

const Swp = () => {
  return (
    <div className="customer container-fluid">
      <div className="container review-section">
        <h2>What Our Customers Say</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}  // No need to import Autoplay separately
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper-container"
        >
          <SwiperSlide>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="review-image" alt="Customer 1" />
            <div className="review-name">Sara Wilsson</div>
            <div className="review-role">Designer</div>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Amazing battery service! Quick and reliable, highly recommended!"</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://randomuser.me/api/portraits/women/48.jpg" className="review-image" alt="Customer 2" />
            <div className="review-name">Jena Karlis</div>
            <div className="review-role">Store Owner</div>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Great prices and fast delivery. My car battery was replaced in no time!"</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://randomuser.me/api/portraits/men/50.jpg" className="review-image" alt="Customer 3" />
            <div className="review-name">Matt Brandon</div>
            <div className="review-role">Freelancer</div>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Very professional service. The warranty registration was easy and smooth!"</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://randomuser.me/api/portraits/men/45.jpg" className="review-image" alt="Customer 1" />
            <div className="review-name">John Doe</div>
            <div className="review-role">Car Enthusiast</div>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Best battery recommendations! The system found the perfect match for my car."</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://randomuser.me/api/portraits/women/55.jpg" className="review-image" alt="Customer 2" />
            <div className="review-name">Emily Watson</div>
            <div className="review-role">Business Owner</div>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Excellent customer support. They guided me in choosing the right battery!"</p>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Swp;
