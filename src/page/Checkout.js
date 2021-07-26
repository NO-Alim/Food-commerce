import React,{useState, useEffect, useRef} from 'react'
import {useGlobalContext} from '../context'
import Modal from 'react-modal';
import './scss/Checkout.scss'
import {FaTimes} from 'react-icons/fa'
import { useHistory } from 'react-router-dom';



Modal.setAppElement("#root");
const Checkout = () => {
    const {product,loading,refCounter, setRefCounter} = useGlobalContext();
    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')));
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        country:'',
        post: ''
    });
    const firstNameRef = useRef(null);
    const addressRef = useRef(null);
    const apartmentRef = useRef(null);
    const cityRef = useRef(null);
    const countryRef = useRef(null);
    const postRef = useRef(null);


    const location = useHistory();
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
        if (e.target.name === 'firstName') {
            firstNameRef.current.style.borderColor = 'transparent'
        }
        if (e.target.name === 'address') {
            addressRef.current.style.borderColor = 'transparent'
        }

        if (e.target.name === 'apartment') {
            apartmentRef.current.style.borderColor = 'transparent'
        }
        if (e.target.name === 'city') {
            cityRef.current.style.borderColor = 'transparent'
        }
        if (e.target.name === 'country') {
            countryRef.current.style.borderColor = 'transparent'
        }
        if (e.target.name === 'post') {
            postRef.current.style.borderColor = 'transparent'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.firstName && state.address && state.apartment && state.city && state.country && state.post) {
            setIsModalOpen(!isModalOpen);
        }
        if (!state.firstName) {
            firstNameRef.current.style.borderColor = 'red'
        }
        if (!state.address) {
            addressRef.current.style.borderColor = 'red'
        }
        if (!state.apartment) {
            apartmentRef.current.style.borderColor = 'red'
        }
        if (!state.city) {
            cityRef.current.style.borderColor = 'red'
        }
        if (!state.country) {
            countryRef.current.style.borderColor = 'red'
        }
        if (!state.post) {
            postRef.current.style.borderColor = 'red'
        }
    }

    useEffect(() => {
        if (cartList) {
            if (cartList.length < 1) {
                setTotalPrice(0);
            } else{
                const getTotalPrice = cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next);
                setTotalPrice(getTotalPrice);
            }
        }
      },[refCounter])

    return (
        <div className="checkout-container">
            <div className="check-content">
                <div className="left-content">
                    <span>Shipping address</span>
                    <form>
                        <div className="name">
                            <input type="text" value={state.firstName} name="firstName" onChange={(e) => handleChange(e)} placeholder="First name*" ref={firstNameRef}/>
                            <input type="text" value={state.lastName} name="lastName" onChange={(e) => handleChange(e)} placeholder="Last name" />
                        </div>
                        <div className="address">
                            <input type="text" value={state.address} name="address" onChange={(e) => handleChange(e)} placeholder="Address*" ref={addressRef}/>
                        </div>
                        <div className="home">
                            <input type="text" value={state.apartment} name="apartment" onChange={(e) => handleChange(e)} placeholder="Apartment, suite, etc.*" ref={apartmentRef} />
                        </div>
                        <div className="city">
                            <input type="text" value={state.city} name="city" onChange={(e) => handleChange(e)} placeholder="City*" ref={cityRef}/>
                        </div>
                        <div className="region">
                            <input type="text" value={state.country} name="country" onChange={(e) => handleChange(e)} placeholder="Country / region*" ref={countryRef}/>
                            <input type="text" value={state.post} name="post" onChange={(e) => handleChange(e)} placeholder="Postal code*" ref={postRef}/>
                        </div>
                        <div className="checked-box-container">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">Save this information for next time.</label>
                        </div>
                        <div className="btn-container">
                            <button onClick={handleSubmit}>Continue to shipping</button>
                            <Modal
                            isOpen={isModalOpen}
                            onRequestClose={toggleModal}
                            contentLabel="My dialog" className="modal">
                                <div>
                                    <div className="close-btn-container">
                                        <span onClick={toggleModal} className="modal-close"><FaTimes /></span>
                                    </div>
                                    <div className="modal-content">
                                        <h2>Hey dude!!</h2>
                                        <h4>This section is under work.</h4>
                                        <button onClick={() => location.push('/')}>Home</button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </form>
                </div>
                <div className="right-content">
                    <h3>cart total</h3>
                    <div className="subtotal">
                        <span>Subtotal</span>
                        <span className="price">${(Math.round(totalPrice * 100) / 100).toFixed(2)}</span>
                    </div>
                    <div className="subtotal">
                        <span>shipping</span>
                        <span className="price">$50.00</span>
                    </div>
                    <div className="subtotal">
                        <span>taxes</span>
                        <span className="price">${(Math.round(totalPrice / 15 * 100) / 100).toFixed(2)}</span>
                    </div>
                    <span className="hr"></span>
                    <div className="subtotal">
                        <span>total :</span>
                        <strong>${(Math.round((totalPrice + totalPrice / 15) * 100) / 100).toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
