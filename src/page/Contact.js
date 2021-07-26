import React, { useRef, useState } from 'react'
import './scss/Contact.scss'
import {FaAddressBook,FaPhoneAlt,} from 'react-icons/fa'
import {FiMail} from 'react-icons/fi'
import Modal from 'react-modal';
import {FaTimes} from 'react-icons/fa'
import { useHistory } from 'react-router-dom';

Modal.setAppElement("#root");

const Contact = () => {
    const location = useHistory();
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const handleChange = (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
        if (e.target.name === 'name') {
            nameRef.current.style.borderColor = 'transparent'
        }
        if (e.target.name === 'email') {
            emailRef.current.style.borderColor = 'transparent'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.name && state.email) {
            setIsModalOpen(!isModalOpen);
        }

        //style
        if (!state.name) {
            nameRef.current.style.borderColor = 'red'
        } else{
            nameRef.current.style.borderColor = 'transparent'
        }

        if (!state.email) {
            emailRef.current.style.borderColor = 'red'
        } else{
            emailRef.current.style.borderColor = 'transparent'
        }
    }
    const toggleModal = (e) => {
        setIsModalOpen(!isModalOpen);
    }
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
                            <input type="text" value={state.name} placeholder="Your name *" name="name" onChange={(e) => handleChange(e)} ref={nameRef}/>
                            <input type="email" value={state.email} name="email" placeholder="Your email *" onChange={(e) => handleChange(e)} ref={emailRef}/>
                        </div>
                        <div className="subject">
                            <input type="text" value={state.subject} name="subject" placeholder="Subject" onChange={(e) => handleChange(e)}/>
                        </div>
                        <div className="message">
                            <textarea name="message" value={state.message} name="message" placeholder="Type your message here" onChange={(e) => handleChange(e)}></textarea>
                        </div>
                        <div className="submit">
                            <input type="submit" onClick={(e) => handleSubmit(e)}/>
                            <Modal
                            isOpen={isModalOpen}
                            onRequestClose={toggleModal}
                            contentLabel="My dialog" className="modal">
                                <div>
                                    <div className="close-btn-container">
                                        <span onClick={toggleModal} className="modal-close"><FaTimes /></span>
                                    </div>
                                    <div className="modal-content">
                                        <h2>Hey {state.name}</h2>
                                        <h4>your request is accepted.we'll be contact you latter via {state.email}.
                                        thank you for supporting us.</h4>
                                        <button onClick={() => location.push('/')}>Home</button>
                                    </div>
                                </div>
                            </Modal>
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
