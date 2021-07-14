import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../component/Loader';
import { useGlobalContext } from '../context';
import './scss/SingleProduct.scss'
import {FaStar,FaStarHalf,FaRegStar,FaStarHalfAlt,FaHeart,FaRegHeart} from 'react-icons/fa'
import {BsDot} from 'react-icons/bs'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SingleProduct = () => {
    const {id} = useParams();
    const {product,loading} = useGlobalContext();
    const [quantity, setQuantity] = useState(1);

    //const ThisProduct = product.filter(item => item.id == id);

    const handleDecrease = () =>{
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    if (loading) {
        return(
            <Loader />
        )
    }
    return (
        <div className="singleProduct-container">
            {product.filter(item => item.id == id).map((item, ind) => {
                return(
                    <div className="singleProduct-content" key={ind}>
                        <div className="preduct-sec">
                            <div className="top-container">
                                <Link to="/">Home</Link> / <Link to="#" className='disabled-link'>product</Link>
                            </div>
                            <div className="bottom-container">
                                <div className="img-container">
                                    <img src={item.image} alt={item.name}/>
                                </div>
                                <div className="product-description">
                                    <div className="description-content">
                                        <h2>{item.name}</h2>
                                        <h3>${item.price}</h3>
                                        <h4><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar /></h4>
                                        
                                        <span className="hr"></span>
                                        <div className="para-sec">
                                            <p>{item.IntroOne}</p>
                                            <p>{item.IntroTwo}</p>
                                            <p>{item.IntroThree}</p>
                                        </div>
                                        <div className="glass">
                                            <p><span>Glass: </span>{item.glass}</p>
                                        </div>
                                        <div className="info">
                                            <p><span>Info: </span>{item.info}</p>
                                        </div>
                                        <div className="category">
                                            <p><span>Category: </span>{item.category}</p>
                                        </div>
                                        <div className="customer-sec">
                                            <div className="quantity">{quantity}
                                            <span className="top" onClick={() => setQuantity(quantity + 1)}></span>
                                            <span className="bottom" onClick={() => handleDecrease()}></span>
                                            </div>
                                            <button className="add-btn">Add Card</button>
                                            <button className="buy-btn">Buy Now</button>
                                            
                                            <span className="heart"><FaRegHeart /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review-sec">
                            <div className="tab-container">
                                <Tabs className="tabs">
                                    <TabList>
                                        <Tab>Description</Tab>
                                        <Tab>Reviews</Tab>
                                        <Tab>Shipping Policy</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <p>{item.IntroOne}</p>
                                        <p>{item.IntroTwo}</p>
                                        <p>{item.IntroThree}</p>
                                        <p>{item.IntroOne}</p>
                                        <p>{item.IntroTwo}</p>
                                        <p>{item.IntroThree}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate</p>
                                        <ul className="policy">
                                            <li><p><span><BsDot /></span> 1-2 business days (Typically by end of day)</p> </li>
                                            <li><a href="#"><span><BsDot /></span> 30 days money back guaranty</a> </li>
                                            <li><p><span><BsDot /></span> 24/7 live support</p> </li>
                                            <li><p><span><BsDot /></span> odio dignissim qui blandit praesent</p> </li>
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>
                                    <ul className="policy">
                                            <li><p><span><BsDot /></span> 1-2 business days (Typically by end of day)</p> </li>
                                            <li><a href="#"><span><BsDot /></span> 30 days money back guaranty</a> </li>
                                            <li><p><span><BsDot /></span> 24/7 live support</p> </li>
                                            <li><p><span><BsDot /></span> odio dignissim qui blandit praesent</p> </li>
                                        </ul>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SingleProduct
