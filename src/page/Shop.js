import React,{useState,useEffect,useRef} from 'react'
import './scss/Shop.scss'
import MultiRangeSlider from '../component/MultiRangeSlider'
import { useGlobalContext } from '../context'
import {FiMinus,FiPlus,FiShoppingBag} from 'react-icons/fi'
import Slider from 'react-slick'
import Loader from '../component/Loader'
import { useHistory } from 'react-router-dom'



const Shop = () => {
    const {product,loading} = useGlobalContext();
    const [loadNumber, setLoadNumber] = useState(6);
    const loadbuttonRef = useRef(null);
    const [slideAccordion, setSlideAccordion] = useState(true);
    const [searchAccordion, setSearchAccordion] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);
    const location = useHistory();

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
        setProducts(product);
        var xyz = product.filter(item => item.category.toLowerCase().includes(searchValue.toLowerCase()) || item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.info.toLowerCase().includes(searchValue.toLowerCase()));
        setProducts(xyz);
    },[searchValue,product])

    useEffect(() => {
        var price = JSON.parse(localStorage.price);
        if (products.length > 0) {
            let minPrice = Math.min.apply(null, products.map(item => item.price));
            let maxPrice = Math.max.apply(null, products.map(item => item.price));
            //edit localstroge data
            price[0].minPrice = minPrice;
            price[0].maxPrice = maxPrice;
            localStorage.setItem('price',JSON.stringify(price))
        } 
        
        if (products.length <= 0){
            price[0].minPrice = 0;
            price[0].maxPrice = 0;
            localStorage.setItem('price',JSON.stringify(price));
        }

        setRangeMin(price[0].sellMinPrice);
        setRangeMax(price[0].sellMaxPrice);
    },[products])

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
                                <input type="text" value={searchValue} placeholder="type name" onChange={(e) => setSearchValue(e.target.value)}/>
                            </div>
                        </div>
                        <div className="filter-item">
                            <div className="filter-accordion" onClick={() => setSlideAccordion(!slideAccordion)}>
                                <strong>Filter by Price</strong>
                                <span>{slideAccordion ? <FiMinus />: <FiPlus />}</span>
                            </div>
                            <div className={`accordion-content ${slideAccordion ? 'active':null}`}>
                                <MultiRangeSlider min={rangeMin} max={rangeMax} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-component">
                {products.length > 0 ? null : <h1>No Item Found!!!</h1>}
                    <div className="products-list">
                        {products.slice(0,loadNumber).map((item,ind) =>{
                            return(
                                <article key={ind} key={item.id}>
                                    <div className="card">
                                        <div className="img-container" onClick={() => location.push(`/product/${item.id}`)}>
                                        <img src={item.image}/>
                                        </div>
                                        <div className="card-content">
                                            <p style={{cursor: 'pointer'}} onClick={() => location.push(`/product/${item.id}`)}>{item.name}</p>
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
                    {products.length >  0? <button  className="load-btn" onClick={() => setLoadNumber(loadNumber + 6)} ref={loadbuttonRef}>Load More</button> : null}
                </div>
            </div>
        </div>
    )
}

export default Shop
