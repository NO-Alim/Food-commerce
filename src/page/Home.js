import React from 'react'
import Header from '../component/Header'
import Categoris from '../component/Categoris'
import FoodShortList from '../component/FoodShortList'


const Home = () => {
    return (
        <div>
            <Header />
            <Categoris />
            <FoodShortList />
        </div>
    )
}

export default Home
