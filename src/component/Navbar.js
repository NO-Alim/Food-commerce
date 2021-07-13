import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../context';
import {NavLink} from 'react-router-dom'
import {FaSun,FaMoon,FaTimes} from 'react-icons/fa'
import {FiMenu,FiShoppingCart,FiSearch} from 'react-icons/fi'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import './scss/Navbar.scss'
import Headroom from 'react-headroom'


const img = 'https://cdn.shopify.com/s/files/1/0162/3932/9344/files/logo-white_160x.png?v=1547879955'

const useStyles = makeStyles({
    root: {
        display: 'flex',
      },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
      drawerPaper : {
          width: 250,
          background: "#0b162a",
          color: "#e9e9e9"
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
  //drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

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

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme',theme);
  }, [theme])

    return (
        <div>
            <Headroom >
            <nav>
                <div className="nav-container">
                    <div className="link-container">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/shop">shop</NavLink></li>
                            <li><NavLink to="/campaigns">campaigns</NavLink></li>
                            <li><NavLink to="/sell">sell</NavLink></li>
                            <li><NavLink to="/contact">contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="logo-container">
                        <div className="logo">
                            <h1>FoodCare</h1>
                        </div>
                    </div>
                    <div className="cart-menu">
                        <div className="cart-container">
                            <div className="dark-mood">
                                <span onClick={() => toggleTheme()}>{theme === "light-theme" ? <FaMoon />: <FaSun />}</span>
                            </div>
                            <div className="cart-icon">
                                <span onClick={() => toggleCartDrawer()}><FiShoppingCart/></span>
                                <span className="item-total">0</span>
                            </div>
                            <div className="cart-items-price">
                                <span>0<span className="spacial-tag">/</span>$0.00</span>
                            </div>
                            <div className="menu">
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
                        <button onClick={() => setDrawerOpen(false)} className="close-btn"><FaTimes /></button>
                    </div>
                </div>
        </Drawer>
        <Drawer className={classes.list}
            palette="secondary"
            variant="persistent"
            open={cartDrawerOpen}
            anchor="right"
            classes={{paper: classes.drawerPaper}}>
                <div className="drawer-container cart-drawer">
                    <div className="drawer-btn-container">
                        <button onClick={() => setCartDrawerOpen(false)} className="close-btn"><FaTimes /></button>
                    </div>
                </div>
        </Drawer>
        </div>
    )
}

export default Navbar
