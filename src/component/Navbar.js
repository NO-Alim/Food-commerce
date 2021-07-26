import React,{useState,useEffect, useRef} from 'react'
import { useGlobalContext } from '../context';
import {NavLink, useHistory} from 'react-router-dom'
import {FaSun,FaMoon,FaTimes} from 'react-icons/fa'
import {FiMenu,FiShoppingCart,FiChevronsRight, FiChevronsLeft} from 'react-icons/fi'
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
    const {product,loading,deleteCartItem,refCounter, setRefCounter} = useGlobalContext();
    const [theme, setTheme] = useState(getStorageTheme());
    const width = useWindowWidth();
    const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')));


    const [totalPrice, setTotalPrice] = useState(0);
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
const handleIncrease = (id) => {
    var sameItem = JSON.parse(localStorage.cartList);
    for(var i = 0;i < sameItem.length; i++){
        if (id === sameItem[i].id) {
            sameItem[i].quantity += 1;
            break;
        }
    }
    localStorage.setItem('cartList',JSON.stringify(sameItem))
    setRefCounter(refCounter + 1)
}
const handleDecrease = (id) =>{
    var sameItem = JSON.parse(localStorage.cartList);
    for(var i = 0;i < sameItem.length; i++){
        if (id === sameItem[i].id) {
            if (sameItem[i].quantity > 1) {
                sameItem[i].quantity -= 1;
            }
            break;
        }
    }
    localStorage.setItem('cartList',JSON.stringify(sameItem))
    setRefCounter(refCounter - 1)
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
  },[width]);

  useEffect(() => {
      setCartList(JSON.parse(localStorage.getItem('cartList')));
  },[refCounter]);

//   useEffect(() => {
//     if (cartList) {
//         if (cartList.length < 1) {
//             setTotalPrice(0);
//         } else{
//             const getTotalPrice = cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next);
//             setTotalPrice(getTotalPrice);
//         }
//     }
//   },[refCounter])
  

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
                                <span className='item-total'>{cartList ? cartList.length : 0 }</span>
                            </div>
                            <div className="cart-items-price">
                                <span>{cartList ? <span>{cartList.length}</span> : <span>0</span>}<span className="spacial-tag">/</span>${cartList ? cartList.length > 0 ? <span>{(Math.round((cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next)) * 100) / 100).toFixed(2)}</span>: 0 : 0}</span>
                            </div>
                            <div className="menu" ref={menuRef}>
                                {/* <span onClick={() => toggleDrawer()}><FiMenu /></span> */}
                                <div className="menu-container">
                                    <div className={`menus ${toggleCartDrawer ? 'active': null}`} onClick={toggleCartDrawer}>
                                        <span className="menu-bar"></span>
                                        <span className="menu-bar"></span>
                                        <span className="menu-bar"></span>
                                    </div>
                                </div>
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
                        <button onClick={() => setDrawerOpen(false)} className="close-btn" ref={menuBtnRef}><FiChevronsLeft /></button>
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
                        {!cartList && <h3>no item added</h3>}
                        {cartList ? cartList.length < 1 && <h1>no item added</h1>: null}
                        {cartList && cartList.map((item,ind) => {
                                return(
                                    <div className="cart-item" key={ind}>
                                        <div className="img-container" onClick={() => {location.push(`/product/${item.id}`); setCartDrawerOpen(false)}}>
                                            <img src={item.img}/>
                                        </div>
                                        <div className="cart-content">
                                            <h3>{item.name}</h3>
                                            <div className="quantity">{item.quantity}
                                                <span className="top" onClick={() => handleIncrease(item.id)}></span>
                                                <span className="bottom" onClick={() => handleDecrease(item.id)}></span>
                                            </div>
                                            {/* <span className="into"><FaTimes /></span> */}
                                            <h4>${(Math.round(item.price * 100) / 100).toFixed(2)}</h4>
                                        </div>
                                        <div className="remove-btn">
                                            <span onClick={() => {deleteCartItem(item.id); setRefCounter(refCounter + 1)}}><FaTimes /></span>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className="drawer-bottom-container">
                        <strong>Total: ${cartList ? cartList.length > 0 ? <span>{(Math.round((cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next)) * 100) / 100).toFixed(2)}</span>: 0 : 0}</strong>
                        <div className="btn-group">
                            <button onClick={() => {location.push('/full-cart');setCartDrawerOpen(false)}}>View cart</button>
                            <button onClick={() => {location.push('/checkout');setCartDrawerOpen(false)}}>Checkout</button>
                        </div>
                    </div>
                </div>
        </Drawer>
        </div>
    )
}

export default Navbar

//(Math.round((cartList.map(item => item.price * item.quantity).reduce((prev,next) => prev + next)) * 100) / 100).toFixed(2)