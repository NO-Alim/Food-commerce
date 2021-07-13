import React from 'react'
import './scss/SearchSection.scss'
import {FiSearch} from 'react-icons/fi'

const SearchSection = () => {
    return (
        <div className="search-container">
            <div className="search-content">
                <h3>What you searching for?</h3>
                <form>
                    <input type="text" name="search" placeholder="example" />
                    <button><FiSearch /></button>
                </form>
            </div>
        </div>
    )
}

export default SearchSection
