import React from 'react'
import './scss/Contact.scss'
import {FaAddressBook,FaPhoneAlt,} from 'react-icons/fa'
import {FiMail} from 'react-icons/fi'

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="map-container">
                maps
            </div>
            <div className="contact-container">
                <div className="form-container">
                    <h3>Tell us your project.</h3>
                    <form>
                        <div className="author">
                            <input type="text" placeholder="Your name *" />
                            <input type="email" placeholder="Your email *"/>
                        </div>
                        <div className="subject">
                            <input type="text" placeholder="Subject" />
                        </div>
                        <div className="message">
                            <textarea name="message" placeholder="Type your message here"></textarea>
                        </div>
                        <div className="submit">
                            <input type="submit" />
                        </div>
                    </form>
                </div>
                <div className="contact-info">
                    <h3>Contact us</h3>
                    <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas human.</p>

                    <div className="address">
                        <span><FaAddressBook />&nbsp;&nbsp; Address: No 40 Baria Sreet 133/2 NewYork City.</span>
                    </div>
                    <div className="address">
                        <span><FaPhoneAlt />&nbsp;&nbsp; 716-298-1822</span>
                    </div>
                    <div className="address">
                        <span><FiMail />&nbsp;&nbsp; info@example.com</span>
                    </div>
                    <h4>Working Hours</h4>
                    <div className="working-hour">
                        <strong>Monday - Saturday: </strong>
                        <span>08Am - 22Pm</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
