import React from 'react'
import { useGlobalContext } from '../context'
import './scss/Categoris.scss'

const Categoris = () => {
    const {product} = useGlobalContext();

    const getUniqList = (arr,key) =>{
        return [...new Map(arr.map(item => [item[key],item])).values()];
    }
    const category = getUniqList(product,'category');
    return (
        <div className="category-container">
            <div className="category">
                <h1 className="category-title">FEATURED CATEGORIES</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ratione consequatur id pariatur tempore eaque ducimus placeat quos autem ipsa!</p>
                <div className="category-cards">
                {category.map((item,ind) =>{
                    return(
                        <article key={ind}>
                            <img src={item.image}/>
                            <span></span>
                            <strong>{item.category}</strong>
                        </article>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Categoris