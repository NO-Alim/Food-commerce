import React,{useState,useEffect} from 'react'
import './scss/FullCart.scss'
import { useGlobalContext } from '../context';
import {FaTimes} from 'react-icons/fa'
import { useHistory } from 'react-router-dom';

const FullCart = () => {
    const {product,loading,deleteCartItem,refCounter, setRefCounter} = useGlobalContext();
    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')));
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useHistory();

    const handleIncrease = (id) => {
        var sameItem = JSON.parse(localStorage.cartList);
        for(var i = 0;i < sameItem.length; i++){
            if (id === sameItem[i].id) {
                sameItem[i].quantity += 1;
                break;
            }
        }
        localStorage.setItem('cartList',JSON.stringify(sameItem))
        setRefCounter(refCounter + 1)
    }
    const handleDecrease = (id) =>{
        var sameItem = JSON.parse(localStorage.cartList);
        for(var i = 0;i < sameItem.length; i++){
            if (id === sameItem[i].id) {
                if (sameItem[i].quantity > 1) {
                    sameItem[i].quantity -= 1;
                }
                break;
            }
        }
        localStorage.setItem('cartList',JSON.stringify(sameItem))
        setRefCounter(refCounter - 1)
    }

    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem('cartList')));
    },[refCounter]);
  
    useEffect(() => {
        if (cartList) {
            if (cartList.length < 1) {
                setTotalPrice(0);
            } else{
                const getTotalPrice = cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next);
                setTotalPrice(getTotalPrice);
            }
        }

        window.addEventListener('storage', () => {
            console.log('oiiii');
          });
      
    },[refCounter]);

    return (
        <div className="full-cart-container">
            <div className="drawer-product-container">
                {!cartList && <h3>no item added</h3>}
                {cartList ? cartList.length < 1 && <h1>no item added</h1>: null}
                {cartList && cartList.map((item,ind) => {
                        return(
                            <div className="cart-item" key={ind}>
                                <div className="img-container" onClick={() => location.push(`/product/${item.id}`)}>
                                    <img src={item.img}/>
                                </div>
                                <div className="cart-content">
                                    <h3>{item.name}</h3>
                                    <div className="type">
                                        <strong>Type:</strong>
                                        <span>alcholic</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus ipsum illo consequuntur alias aperiam ipsa voluptate laboriosam quas est commodi.</p>
                                    <div className="quantity">{item.quantity}
                                        <span className="top" onClick={() => handleIncrease(item.id)}></span>
                                        <span className="bottom" onClick={() => handleDecrease(item.id)}></span>
                                    </div>
                                    {/* <span className="into"><FaTimes /></span> */}
                                    <h4>${(Math.round(item.price * 100) / 100).toFixed(2)}</h4>
                                </div>
                                <div className="remove-btn">
                                    <span onClick={() => {deleteCartItem(item.id); setRefCounter(refCounter + 1)}}><FaTimes /></span>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <span className="hr"></span>
            <div className="total-price">
                <h2>total price</h2>
                <h2>${cartList ? cartList.length > 0 ? <span>{(Math.round((cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next)) * 100) / 100).toFixed(2)}</span>: 0 : 0}</h2>
                <button onClick={() => location.push('/checkout')}>checkOut</button>
            </div>
        </div>
    )
}

export default FullCart
