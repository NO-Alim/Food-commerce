import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context';
import './scss/FilteredProduct.scss'
import {FiShoppingBag} from 'react-icons/fi'

const FilteredProduct = () => {
    const {id} = useParams();
    console.log(id);
    const {product} = useGlobalContext();
    const FilterItem = product.filter(item => item.category === id);
    console.log(id);
    return (
        <div className="filter-container">
            <h1>{id}</h1>
            <div className="filter-content">
                {FilterItem.map((item, ind) =>{
                    return(
                        <article key={item.id}>
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
        </div>
    )
}

export default FilteredProduct
