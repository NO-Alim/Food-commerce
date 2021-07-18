import React from 'react'
import './scss/Header.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {FiArrowLeft,FiArrowRight} from 'react-icons/fi'
import { useHistory } from 'react-router-dom';


const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
};


const Header = () => {
    const lacation = useHistory();
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
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <li
                                className="indicator active"
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            className="indicator"
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`${label} ${index + 1}`}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}>
                    <div className='carousel-item'>
                        <img src="https://cdn.pixabay.com/photo/2016/06/29/17/14/drink-1487304_960_720.jpg" alt="" />
                        <div className="carousel-content">
                            <h3>Healthy Life with</h3>
                            <h2>Nature Organic</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, molestiae dolor? Quidem, nesciunt? Officiis, atque.</p>
                            <button onClick={() => lacation.push('/sell')}>Shop Now</button>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src="https://cdn.pixabay.com/photo/2017/05/30/12/21/green-tea-2356770_960_720.jpg" alt="" />
                        <div className="carousel-content">
                            <h3>cold process organic</h3>
                            <h2>Savpm stpries</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, molestiae dolor? Quidem, nesciunt? Officiis, atque.</p>
                            <button>Shop Now</button>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src="https://cdn.pixabay.com/photo/2017/01/07/20/41/alcohol-1961542_960_720.jpg" alt="" />
                        <div className="carousel-content">
                            <h3>Healthy Life with</h3>
                            <h2>Wild Organic</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, molestiae dolor? Quidem, nesciunt? Officiis, atque.</p>
                            <button>Shop Now</button>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Header