import React from 'react'
import Header from '../component/Header'
import Categoris from '../component/Categoris'
import FoodShortList from '../component/FoodShortList'
import Blog from '../component/Blog'
import NewsLetter from '../component/NewsLetter'
import SearchSection from '../component/SearchSection'
import { useGlobalContext } from '../context'
import Loader from '../component/Loader'


const Home = () => {
    const {loading} = useGlobalContext();
    return (
        <div>
            <Header />
            
            {loading ? <Loader /> : <div>
                <SearchSection />
                <Categoris />
                <FoodShortList />
                <Blog />
                <NewsLetter />
            </div>}
        </div>
    )
}

export default Home
