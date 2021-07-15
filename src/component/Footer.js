import React from 'react'
import './scss/Footer.scss'
import {Link, useHistory} from 'react-router-dom'
import {FaEnvelope,FaMapMarkerAlt,FaMobileAlt} from 'react-icons/fa'

const Footer = () => {
    const location = useHistory();
    return (
        <div className="footer-container">
            <footer>
                <div className="footer-contact">
                    <div className="footer-heading">
                        <h1 onClick={() => location.push('/')}>FoodCare</h1>
                    </div>
                    <div className="footer-content">
                        <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.</p>
                        <p><span><FaMapMarkerAlt /></span> Contact info: 169-C, Technohub, Dubai Silicon Oasis.</p>

                        <p><span><FaMobileAlt /></span> Telephone: 169-C, Technohub, Dubai Silicon Oasis.</p>

                        <p><span><FaEnvelope /></span> Email: Support@example.com</p>
                    </div>
                </div>
                <div className="footer-links">
                    <div className="footer-heading">
                        <h3>products</h3>
                    </div>
                    <ul>
                        <li><Link to="#">prices drop</Link></li>
                        <li><Link to="#">New Products</Link></li>
                        <li><Link to="#">Best sales</Link></li>
                        <li><Link to="#">Stores</Link></li>
                        <li><Link to="#">Login</Link></li>
                        <li><Link to="#">My Account</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <div className="footer-heading">
                        <h3>Our Company</h3>
                    </div>
                    <ul>
                        <li><Link to="#">Delivery</Link></li>
                        <li><Link to="#">Legal Notice</Link></li>
                        <li><Link to="#">Documentation</Link></li>
                        <li><Link to="#">Secure Payment</Link></li>
                        <li><Link to="#">contact Us</Link></li>
                        <li><Link to="#">Stores</Link></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <div className="footer-heading">
                        <h3>Instagram</h3>
                    </div>
                </div>
            </footer>
            <p className="copy-right">copyright &copy; <span>FoodCare</span>. All Right Reserved.</p>
        </div>
    )
}

export default Footer
