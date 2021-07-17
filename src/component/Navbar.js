import React,{useState,useEffect, useRef} from 'react'
import { useGlobalContext } from '../context';
import {NavLink, useHistory} from 'react-router-dom'
import {FaSun,FaMoon,FaTimes} from 'react-icons/fa'
import {FiMenu,FiShoppingCart,FiChevronsRight} from 'react-icons/fi'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import './scss/Navbar.scss'
import Headroom from 'react-headroom'
import { useWindowWidth } from '@react-hook/window-size'


const img = 'https://cdn.shopify.com/s/files/1/0162/3932/9344/files/logo-white_160x.png?v=1547879955'

const useStyles = makeStyles({
    root: {
        display: 'flex',
      },
    list: {
        width: 'auto',
      },
      fullList: {
        width: 'auto',
      },
      drawerPaper : {
          width: 'auto',
          background: "transparent",
      }
  });

const getStorageTheme = () => {
    let theme = 'light-theme'
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    return theme;
  }

  

const Navbar = () => {
    const classes = useStyles();
    const {product} = useGlobalContext();
    const [theme, setTheme] = useState(getStorageTheme());
    const [quantity, setQuantity] = useState(1);
    const width = useWindowWidth();
    const cartList = JSON.parse(localStorage.getItem('cartList'));
  //drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const location = useHistory();


  //ref
  const navRef = useRef(null);
  const cartRef = useRef(null);
  const cartBtnRef = useRef(null);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  //theme
  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme')
    } else{
      setTheme('light-theme')
    }
  }

  const toggleDrawer = () =>{
    setDrawerOpen(!drawerOpen);
}

const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
}


//cart quantity
const handleDecrease = () =>{
    if (quantity > 1) {
        setQuantity(quantity - 1)
    }
}
//theme
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme',theme);
  }, [theme])


  //cart

  const handleClick = (e) => {
      if (!cartBtnRef.current.contains(e.target)) {
          if (!cartRef.current.contains(e.target)) {
              setCartDrawerOpen(false)
          }
      }

      if (!menuBtnRef.current.contains(e.target)) {
          if (!menuRef.current.contains(e.target)) {
              setDrawerOpen(false);
          }
      }
  }

  const mediaWidth = () =>{
      if (width > 900) {
          setDrawerOpen(false);
      }
  }


  useEffect(() =>{
    document.addEventListener('click', handleClick);
    return () =>{
        document.removeEventListener('click', handleClick);
    }
  })

  useEffect(() => {
        mediaWidth();
        return () =>{
            mediaWidth()
        }
  },[width])

    return (
        <div>
            <Headroom >
            <nav ref={navRef}>
                <div className="nav-container">
                    <div className="link-container">
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/shop">shop</NavLink></li>
                            <li><NavLink to="/campaigns">campaigns</NavLink></li>
                            <li><NavLink to="/sell">sell</NavLink></li>
                            <li><NavLink to="/contact">contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="logo-container">
                        <div className="logo">
                            <h1 onClick={() => location.push('/')}>FoodCare</h1>
                        </div>
                    </div>
                    <div className="cart-menu">
                        <div className="cart-container">
                            <div className="dark-mood">
                                <span onClick={() => toggleTheme()}>{theme === "light-theme" ? <FaMoon />: <FaSun />}</span>
                            </div>
                            <div className="cart-icon">
                                <span onClick={() => toggleCartDrawer()} ref={cartBtnRef}><FiShoppingCart/></span>
                                <span className="item-total">0</span>
                            </div>
                            <div className="cart-items-price">
                                <span>0<span className="spacial-tag">/</span>$0.00</span>
                            </div>
                            <div className="menu" ref={menuRef}>
                                <span onClick={() => toggleDrawer()}><FiMenu /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            </Headroom>
            <Drawer className={classes.list}
            palette="secondary"
            variant="persistent"
            open={drawerOpen}
            anchor="left"
            classes={{paper: classes.drawerPaper}}>
                <div className="drawer-container menu-drawer">
                    <div className="drawer-btn-container">
                        <button onClick={() => setDrawerOpen(false)} className="close-btn" ref={menuBtnRef}><FaTimes /></button>
                    </div>
                    <div className="logo-container">
                        <div className="logo">
                            <h1 onClick={() => location.push('/')}>FoodCare</h1>
                        </div>
                    </div>
                    <div className="link-container">
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/shop">shop</NavLink></li>
                            <li><NavLink to="/campaigns">campaigns</NavLink></li>
                            <li><NavLink to="/sell">sell</NavLink></li>
                            <li><NavLink to="/contact">contact</NavLink></li>
                        </ul>
                    </div>
                </div>
        </Drawer>
        <Drawer className={classes.list}
            palette="secondary"
            variant="persistent"
            open={cartDrawerOpen}
            anchor="right"
            classes={{paper: classes.drawerPaper}} ref={cartRef}>
                <div className="drawer-container cart-drawer">
                    <div className="drawer-btn-container">
                        <button onClick={() => setCartDrawerOpen(false)} className="close-btn"><FiChevronsRight /></button>
                        <h3>My Cart</h3>
                    </div>
                    <div className="drawer-product-container">
                        {/* put if statement & check cartList contain */}
                        {cartList.map((item,ind) => {
                                return(
                                    <div className="cart-item" key={ind}>
                                        <div className="img-container">
                                            <img src={item.img}/>
                                        </div>
                                        <div className="cart-content">
                                            <h3>{item.name}</h3>
                                            <div className="quantity">{item.quantity}
                                                <span className="top" onClick={() => setQuantity(quantity + 1)}></span>
                                                <span className="bottom" onClick={() => handleDecrease()}></span>
                                            </div>
                                            <h4>${item.price}</h4>
                                        </div>
                                        <div className="remove-btn">
                                            <span><FaTimes /></span>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className="drawer-bottom-container">
                        <strong>Total: $324</strong>
                        <div className="btn-group">
                            <button>View cart</button>
                            <button>Checkout</button>
                        </div>
                    </div>
                </div>
        </Drawer>
        </div>
    )
}

export default Navbar
