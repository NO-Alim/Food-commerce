import React,{useState,useEffect,useRef} from 'react'
import './scss/Shop.scss'
import MultiRangeSlider from '../component/MultiRangeSlider'
import { useGlobalContext } from '../context'
import {FiMinus,FiPlus,FiShoppingBag} from 'react-icons/fi'
import Slider from 'react-slick'
import Loader from '../component/Loader'



const Shop = () => {
    const {product,loading} = useGlobalContext();
    const [loadNumber, setLoadNumber] = useState(6);
    const loadbuttonRef = useRef(null);
    const [slideAccordion, setSlideAccordion] = useState(true);
    const [searchAccordion, setSearchAccordion] = useState(true);

    const [products, setProducts] = useState(product);
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

    useEffect(() =>{
        setProducts(product)
    },[product])

    if (loading) {
        return(
            <Loader />
        )
    }

    return (
        <div className="shop-container">
            <div className="shop-content">
                <div className="filter-component">
                    <div className="filter-content">
                        <h3 className="filter-input-label">Search product</h3>
                        <form>
                            <input type="text" placeholder="Type here" className="filter-input" />
                        </form>
                    <div className="filter-item">
                            <div className="filter-accordion" onClick={() => setSearchAccordion(!searchAccordion)}>
                                <strong>Search Here</strong>
                                <span>{searchAccordion ? <FiMinus />: <FiPlus />}</span>
                            </div>
                            <div className={`accordion-content ${searchAccordion ? 'active':null}`}>
                                <input type="text" placeholder="type name"/>
                            </div>
                        </div>
                        <div className="filter-item">
                            <div className="filter-accordion" onClick={() => setSlideAccordion(!slideAccordion)}>
                                <strong>Filter by Price</strong>
                                <span>{slideAccordion ? <FiMinus />: <FiPlus />}</span>
                            </div>
                            <div className={`accordion-content ${slideAccordion ? 'active':null}`}>
                                <MultiRangeSlider />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-component">
                    <div className="products-list">
                        {products.slice(0,loadNumber).map((item,ind) =>{
                            return(
                                <article key={ind} key={item.id}>
                                    <div className="card">
                                        <div className="img-container">
                                        <img src={item.image}/>
                                        </div>
                                        <div className="card-content">
                                            <p>{item.name}</p>
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
