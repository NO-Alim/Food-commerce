import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGlobalContext } from '../context';
import './scss/FilteredProduct.scss'
import {FiShoppingBag} from 'react-icons/fi'
import Loader from '../component/Loader'

const FilteredProduct = () => {
    const {id} = useParams();
    const {product,loading} = useGlobalContext();
    const location = useHistory();
    //by include
    const FilterItem = product.filter(item => item.category.toLowerCase().replace('/','').includes(id.toLowerCase()));
    //by filter 
    //const FilterItem = product.filter(item => item.category.replace('/','') === id);
    if (loading) {
        return(
            <Loader />
        )
    }
    return (
        <div className="filter-container">
            <h1>{FilterItem[0].category}</h1>
            <div className="filter-content">
                {FilterItem.map((item, ind) =>{
                    return(
                        <article key={item.id} >
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
        </div>
    )
}

export default FilteredProduct
