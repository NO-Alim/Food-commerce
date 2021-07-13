import React,{useState,useEffect,useRef} from 'react'
import './scss/Shop.scss'
import MultiRangeSlider from '../component/MultiRangeSlider'
import { useGlobalContext } from '../context'
import {FiMinus,FiPlus,FiShoppingBag} from 'react-icons/fi'



const Shop = () => {
    const {product} = useGlobalContext();
    const [loadNumber, setLoadNumber] = useState(6);

    const loadbuttonRef = useRef(null);

    const [accordionActive, setAccordionActive] = useState[
        {
            inputFilter: false,
            rangeFilter: false
        }
    ];

    // useEffect(() => {
    //     const buttondisable = () => {
    //         if (loadNumber >= product.length) {
    //             loadbuttonRef.current.disabled = true;
    //         } else{
    //             loadbuttonRef.current.disabled = false;
    //         }
    //     }
    //     buttondisable();
    //     return () => {
    //         buttondisable();
    //     }
    // },[product,loadNumber])
    return (
        <div className="shop-container">
            <div className="shop-content">
                <div className="filter-component">
                    <div className="filter-content">
                    <div className="filter-item">
                            <div className="filter-accordion">
                                <strong>Search Here</strong>
                                <span>{accordionActive.inputFilter ? <FiMinus />: <FiPlus />}</span>
                            </div>
                            <div className={`accordion-content ${accordionActive.inputFilter ? 'active':null}`}>
                                <input type="text" placeholder="type name"/>
                            </div>
                        </div>
                        <div className="filter-item">
                            <div className="filter-accordion">
                                <strong>Filter by Price</strong>
                                <span>{accordionActive.rangeFilter ? <FiMinus />: <FiPlus />}</span>
                            </div>
                            <div className={`accordion-content ${accordionActive.rangeFilter ? 'active':null}`}>
                                <MultiRangeSlider />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-component">
                    <div className="products-list">
                        {product.slice(0,loadNumber).map((item,ind) =>{
                            return(
                                <article key={ind} key={item.id}>
                                    <div className="card">
                                        <div className="img-container">
                                        <img src={item.image}/>
                                        </div>
                                        <div className="card-content">
                                            <p>{ind + 1}:{item.name}</p>
                                            <p className="dis">{item.IntroOne.substring(0,20)}.</p>
                                            <span className="price">${item.id.substring(0,3)}</span>
                                            <div className="btn-group">
                                            <button><FiShoppingBag /></button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    <button  className="load-btn" onClick={() => setLoadNumber(loadNumber + 6)} ref={loadbuttonRef}>Load More</button>
                </div>
            </div>
        </div>
    )
}

export default Shop
