import React from 'react'
import './scss/Header.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {FiArrowLeft,FiArrowRight} from 'react-icons/fi'


const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
};


const Header = () => {
    return (
        <div className="header">
            <div className="header-container">
                <Carousel interval={5000} autoPlay={true} showThumbs={false} showStatus={false}  infiniteLoop={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button className="arrow" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
                        <FiArrowLeft />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button className="arrow" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                        <FiArrowRight />
                        </button>
                    )
                }>
                    <div className='carousel-item'>
                        <img src="https://cdn.pixabay.com/photo/2013/02/21/19/06/drink-84533_960_720.jpg" alt="" />
                        <div className="carousel-content">
                            <h3>Healthy Life with</h3>
                            <h2>Nature Organic</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, molestiae dolor? Quidem, nesciunt? Officiis, atque.</p>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src="https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_960_720.jpg" alt="" />
                        <div className="carousel-content">
                            <h3>cold process organic</h3>
                            <h2>Savpm stpries</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, molestiae dolor? Quidem, nesciunt? Officiis, atque.</p>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src="https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722_960_720.jpg" alt="" />
                        <div className="carousel-content">
                            <h3>Healthy Life with</h3>
                            <h2>Wild Organic</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, molestiae dolor? Quidem, nesciunt? Officiis, atque.</p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Header