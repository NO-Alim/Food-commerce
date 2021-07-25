import React from 'react'
import { useHistory, useParams,Link } from 'react-router-dom'
import Loader from '../component/Loader'
import { useGlobalContext } from '../context'
import './scss/SingleBlog.scss'

const SingleBlog = () => {
    const {product,loading} = useGlobalContext();
    const {id} = useParams();
    const ThisBlog = product.filter(item => item.id === id);
    const blogList = product.slice(0,5);
    const location = useHistory();
    if (loading) {
        return(
            <Loader />
        )
    }
    return (
        <div className="singleBlog-container">
            <div className="blog">
                {ThisBlog.map((item,ind) =>{
                    return(
                        <article key={item.id}>
                            <h2>{item.name} IMPROVE HEART AND IMMUNITY.</h2>
                            <span className="author">Posts by : Naturecircle Admin  |  08 Jan, 2019</span>
                            <div className="content">
                                <div className="left-content">
                                    <div className="post">
                                        <span>RECENT POST</span>
                                        <ul>
                                            {blogList.map((item,ind) => {
                                                return (
                                                    <li key={ind}>
                                                        <Link to={`/blog/${item.id}`}>{item.name} improve heart and immunity.</Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>

                                    <div className="post">
                                        <span>RECENT POST</span>
                                        <ul>
                                        {blogList.map((item,ind) => {
                                                return (
                                                    <li key={ind}>
                                                        <Link to={`/blog/${item.id}`}>{item.name} Delicious And Nutritious Vegetable.</Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="right-content">
                                    <div className="img-container">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="description">
                                        <h4>This is SubHeading.</h4>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam facere beatae corrupti. Saepe, necessitatibus quisquam animi deleniti fugiat dignissimos eum atque excepturi ut, repellendus ea voluptatibus, quia eaque hic porro.</p>

                                        <p className="quot">
                                        Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur. In venenatis elit ac ultrices convallis. Duis est nisi, tincidunt ac urna sed, cursus blandit lectus. In ullamcorper sit amet ligula ut eleifend. Proin dictum tempor ligula, ac feugiat metus. Sed finibus tortor eu scelerisque scelerisque.
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque iure ipsam ex. Quis ad at sit non eius cupiditate quas natus eligendi perferendis laboriosam, provident veritatis rerum nesciunt. Temporibus, quo.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, maxime. Dolores ea alias, error cupiditate praesentium laborum nobis, provident minima maxime quisquam iure vel ipsum ex suscipit facere adipisci delectus.
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, voluptatibus sit! Perferendis cupiditate aliquam velit non provident. Beatae in, id assumenda itaque, officia sed reiciendis repudiandae, soluta veniam nostrum qui?
                                        </p>
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

export default SingleBlog
