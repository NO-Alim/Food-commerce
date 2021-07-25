import React,{useState, useEffect} from 'react'
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
    const location = useHistory();
    const toggleModal = (e) => {
        e.preventDefault()
        setIsModalOpen(!isModalOpen);
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
                            <input type="text" placeholder="First name"/>
                            <input type="text" placeholder="Last name" />
                        </div>
                        <div className="address">
                            <input type="text" placeholder="Address" />
                        </div>
                        <div className="home">
                            <input type="text" placeholder="Apartment, suite, etc." />
                        </div>
                        <div className="city">
                            <input type="text" placeholder="City" />
                        </div>
                        <div className="region">
                            <input type="text" placeholder="Country / region"/>
                            <input type="text" placeholder="Postal code" />
                        </div>
                        <div className="checked-box-container">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">Save this information for next time.</label>
                        </div>
                        <div className="btn-container">
                            <button onClick={toggleModal}>Continue to shipping</button>
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
