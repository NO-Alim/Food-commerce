import React from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context';
import {BsThreeDotsVertical} from 'react-icons/bs'
import {FiShare2,FiHeart} from 'react-icons/fi'
import {FaHeart} from 'react-icons/fa'
import './scss/AllBlog.scss'
import '../component/scss/Blog.scss'

const AllBlog = () => {
    const location = useHistory();
    const {product} = useGlobalContext();
    const blogList = product.slice(0,5)
    return (
        <div className="allBlog-container">
            <div className="blog-container">
                <div className="blog">
                    <h1>Our Blogs</h1>
                    <div className="blog-list">
                            {blogList.map((item, ind) =>{
                                return(
                                    <article className="single-blog" key={ind}>
                                        <div className="blog-top-content">
                                            <div className="avatar">
                                                <span className="avatar-icon">R</span>
                                            </div>
                                            <div className="top-content">
                                                <h3>{item.IntroOne.substring(0,20)}</h3>
                                                <p className="posted-by">
                                                    post By: <span>roben Hood</span> - 03 jan, 2022.
                                                </p>
                                            </div>
                                            <div className="menu">
                                                <span><BsThreeDotsVertical ></BsThreeDotsVertical></span>
                                            </div>
                                        </div>
                                        <div className="img-container">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="blog-content">
                                            <p className="post">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quaerat repellat...
                                            </p>
                                            <div className="card-action">
                                                <div className="left">
                                                    <span><FaHeart /></span>
                                                    <span><FiShare2 /></span>
                                                    {/* <FiHeart /> */}
                                                </div>
                                                <div className="right">
                                                    <span className="read-more" onClick={() => location.push(`/blog/${item.id}`)}>Read More</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBlog
