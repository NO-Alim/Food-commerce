import React from 'react'
import './scss/FoodShotList.scss'
import Slider from "react-slick";
import { useGlobalContext } from '../context';
import {FiShoppingBag} from 'react-icons/fi'

const FoodShortList = () => {
    const {product} = useGlobalContext();
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={`foodArrow ${className}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
          />
        );
      }
    
      const SamplePrevArrow =(props)=> {
        const { className, style, onClick } = props;
        return (
          <div
            className={`foodArrow ${className}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
          />
        );
      }

      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
          },
          {
            breakpoint: 850,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
          }
        ]
      };
    return (
        <div className="foodShortList-container">
          <h1>FEATURED PRODUCT</h1>
            <div className="foodShortList">
            <Slider {...settings}>
                {product.map((item,ind) =>{
                    return(
                        <div className="single-silk" key={ind}>
                            <div className="silck-card">
                                <div className="img-container">
                                  <img src={item.image}/>
                                </div>
                                <div className="card-content">
                                    <p>{ind + 1}:{item.name}</p>
                                    <span className="price">${item.id.substring(0,3)}</span>
                                    <div className="btn-group">
                                      <button><FiShoppingBag /></button>
                                    </div>
                        
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
            </div>
        </div>
    )
}

export default FoodShortList
