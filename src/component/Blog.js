import React from 'react'
import { useGlobalContext } from '../context';
import './scss/Blog.scss'

const Blog = () => {
    const {product} = useGlobalContext();
    const blogList = product.slice(0,3)
    console.log(blogList);
    return (
        <div className="blog-container">
            <div className="blog">
                <h1>From Our Blog</h1>
                <div className="blog-list">
                        {blogList.map((item, ind) =>{
                            return(
                                <article className="single-blog">
                                    <div className="img-container">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="blog-content">
                                        <h3>{item.IntroOne.substring(0,20)}</h3>
                                        <p className="posted-by">
                                            post By: <span>roben Hood</span> - 03 jan, 2022.
                                        </p>
                                        <p className="post">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quaerat repellat...
                                        </p>
                                    </div>
                                </article>
                            )
                        })}
                </div>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default Blog
