import React from 'react'
import Header from '../component/Header'
import Categoris from '../component/Categoris'
import FoodShortList from '../component/FoodShortList'
import Blog from '../component/Blog'
import NewsLetter from '../component/NewsLetter'


const Home = () => {
    return (
        <div>
            <Header />
            <Categoris />
            <FoodShortList />
            <Blog />
            <NewsLetter />
        </div>
    )
}

export default Home
