import React from 'react'
import {Link} from 'react-router-dom'
import './scss/NewsLetter.scss'
import {FaTwitter,FaInstagram,FaGoogle,FaLinkedinIn,FaPinterestP,FaShippingFast,FaMoneyCheckAlt} from 'react-icons/fa'
import {BiSupport} from 'react-icons/bi'
import {GiReceiveMoney} from 'react-icons/gi'

const NewsLetter = () => {
    return (
        <div className="newsletter-container">
            <div className="newsletter">
                <h2>Subscribe Newsletter.</h2>
                <p>Get e-mail updates about our latest shop and special offers.</p>
                <div className="form-container">
                    <form>
                        <input type="email" placeholder="Enter Your Email Here.." />
                        <input type="submit" />
                    </form>
                </div>
                <div className="social-container">
                    <ul>
                        <li><Link to="#"><FaTwitter /></Link></li>
                        <li><Link to="#"><FaInstagram /></Link></li>
                        <li><Link to="#"><FaGoogle /></Link></li>
                        <li><Link to="#"><FaLinkedinIn /></Link></li>
                        <li><Link to="#"><FaPinterestP /></Link></li>
                    </ul>
                </div>
                <div className="service-container">
                    <div className="services">
                        <div className="service">
                            <div className="icon">
                                <span><FaShippingFast /></span>
                            </div>
                            <div className="service-content">
                                <h4>Free Delivery</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, placeat incidunt dolorem exercitationem eos maxime?</p>
                            </div>
                        </div>
                        <div className="service">
                            <div className="icon">
                                <span><GiReceiveMoney /></span>
                            </div>
                            <div className="service-content">
                                <h4>Money Guarantee</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, placeat incidunt dolorem exercitationem eos maxime?</p>
                            </div>
                        </div>
                        <div className="service">
                            <div className="icon">
                                <span><BiSupport /></span>
                            </div>
                            <div className="service-content">
                                <h4>Online Support</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, placeat incidunt dolorem exercitationem eos maxime?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter
