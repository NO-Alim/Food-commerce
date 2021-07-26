import React,{useState,useEffect,useRef} from 'react'
import './scss/Shop.scss'
import './scss/Sell.scss'
import MultiRangeSlider from '../component/MultiRangeSlider'
import { useGlobalContext } from '../context'
import {FiMinus,FiPlus,FiShoppingBag} from 'react-icons/fi'
import Loader from '../component/Loader'
import { useHistory } from 'react-router-dom'

const Sell = () => {

    const {product,loading,handleAddCart,rangeValue} = useGlobalContext();
    const [loadNumber, setLoadNumber] = useState(6);
    const loadbuttonRef = useRef(null);
    const [slideAccordion, setSlideAccordion] = useState(false);
    const [searchAccordion, setSearchAccordion] = useState(true);
    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);

    const location = useHistory();

    const percentage = 0.35;

    const [products, setProducts] = useState(product);
    const [searchValue, setSearchValue] = useState('');

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

    // useEffect(() => {
    //     var filteredProduct = product.filter(item => (item.price >= rangeValue.min && item.price <= rangeValue.max));

    // },[rangeValue])

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
                        <input className="filter-input" type="text" value={searchValue} placeholder="Type Here" onChange={(e) => setSearchValue(e.target.value)} />
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
                                <MultiRangeSlider x={rangeMin} y={rangeMax} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-component">
                {products.length > 0 ? null : <h1>No Item Found!!!</h1>}
                    <div className="products-list">
                        {products.slice(0,loadNumber).map((item,ind) =>{
                            let price = item.price * (1 - (percentage ));
                            let initialPrice = ((Math.round(price * 100) / 100).toFixed(2));
                            return(
                                <article key={ind} key={item.id}>
                                    <div className="card">
                                        <div className="img-container" onClick={() => location.push(`/product/${item.id}`)}>
                                            <img src={item.image}/>
                                            <span className="badge">35% off</span>
                                        </div>
                                        <div className="card-content">
                                            <p style={{cursor: 'pointer'}} onClick={() => location.push(`/product/${item.id}`)}>{item.name}</p>
                                            <p className="dis">{item.IntroOne.substring(0,20)}.</p>
                                            <span className="price-Two" style={{display: 'block' ,textDecoration: 'line-through'}}>${item.price}</span>
                                            <span className="price">${initialPrice}</span>
                                            <div className="btn-group">
                                            <button onClick={() => handleAddCart(item.id)}><FiShoppingBag /></button>
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

export default Sell
