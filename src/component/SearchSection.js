import React, { useState } from 'react'
import './scss/SearchSection.scss'
import {FiSearch} from 'react-icons/fi'
import { useEffect } from 'react';
import { useGlobalContext } from '../context';
import {FiShoppingBag} from 'react-icons/fi'

const SearchSection = () => {
    const {product} = useGlobalContext();
    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState([]);
    const [noResult, setNoResult] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchText('')
        if (searchText) {
            var xyz = product.filter(item => item.category.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase()));
            setResult(xyz)
            setNoResult(false);
        } else{
            setResult([])
            setNoResult(true);
        }
    }
    useEffect(() =>{
        // if (searchText) {
        //     var xyz = product.filter(item => item.category.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase()));
        //     setResult(xyz)
        //     setNoResult(false);
        // } else{
        //     setResult([])
        //     setNoResult(true);
        // }
    },[searchText])


    return (
        <div className="search-container">
            <div className="search-content">
                <h3>What you searching for?</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="search" placeholder="example[name/catagories]" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button><FiSearch /></button>
                </form>
            </div>

            <div className="search-result">
                {result.length < 1 ? <h1 className={`no-result ${noResult ? 'noneActive' : ''}`}>No Item Found!!</h1>: <div className="multiple-result"> {result.map((item,ind) =>{
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
                    })}</div>}
            </div>
        </div>
    )
}

export default SearchSection
