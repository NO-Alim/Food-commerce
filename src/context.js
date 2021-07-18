import React,{useStatek,useContext,useEffect, useState, useCallback} from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [refCounter, setRefCounter] = useState(1);
    const [searchTerm, setSearchTerm] = useState('b');
    const [product, setProduct] = useState([]);

    let minPrice = Math.min.apply(null, product.map(item => item.price));
    let maxPrice = Math.max.apply(null, product.map(item => item.price));
    const percentage = 0.35;

    //for cartlist
    const [cartList, setCartList] = useState([]);


    const [price, setPrice] = useState([
            {minPrice: minPrice,
            sellMinPrice:minPrice * (1 - (percentage )),
            maxPrice: maxPrice,
            sellMaxPrice: maxPrice * (1 - (percentage ))}
    ]);
    const fetchProduct = useCallback( async () => {
        setLoading(true);
        try {
            const response = await fetch (`${url}${searchTerm}`)
            const data = await response.json();
            const {drinks} = data;
            if (drinks) {
                const newProduct = drinks.map((item) => {
                    const {
                      idDrink,
                      strDrink,
                      strDrinkThumb,
                      strAlcoholic,
                      strGlass,
                      strCategory,
                      strInstructions,
                      strInstructionsDE,
                      strInstructionsIT
                    } = item
          
                    return {
                      id: idDrink,
                      name: strDrink,
                      image: strDrinkThumb,
                      info: strAlcoholic,
                      glass: strGlass,
                      category: strCategory,
                      IntroOne:strInstructions,
                      Introtwo: strInstructionsDE,
                      IntroThree: strInstructionsIT,
                      price: idDrink.slice(0,3)
                    }
                  })
                setProduct(newProduct);
            } else {
                setProduct([])
            }
            setLoading(false);
            if (!localStorage.getItem('price')) {
                localStorage.setItem("price", JSON.stringify(price))
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            if (!localStorage.getItem('price')) {
                localStorage.setItem("price", JSON.stringify(price))
            }
        }
    },[searchTerm])


    //for delet item form cart
    const deleteCartItem = (id) => {
        const localList = JSON.parse(localStorage.getItem('cartList'));
        for (let i = 0; i < localList.length; i++) {
            if (localList[i].id === id) {
                localList.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('cartList', JSON.stringify(localList));
    }

    //for concat/append to cartList 

    const appendToStorage = (name, data) => {
        var prevItems = localStorage.getItem(name)
        try{
            prevItems = JSON.parse(prevItems);
        } catch (e){
            prevItems = []
        }
        localStorage.setItem(name, JSON.stringify(prevItems.concat(data)))
    }

    const handleAddCart = (id) => {
        const localList = JSON.parse(localStorage.getItem('cartList'));
        var ClickedItem = product.find((item) => item.id === id);

        const ThisProduct = ({
            name: ClickedItem.name,
            id: ClickedItem.id,
            cardId: null,
            price: ClickedItem.price,
            priceTwo: null,
            quantity: 1,
            img: ClickedItem.image
        })

        
        //when there is no item 
        if (localStorage.getItem('cartList') === null) {
            localStorage.setItem('cartList',JSON.stringify(cartList))
        }

        //
        if (!localList) {
            appendToStorage('cartList', ThisProduct);
        } else if (localList.some((item) => item.id === ThisProduct.id)) {
            // //when array contain same object
            // //var itemPrice = localList.find((item) => item.id === ThisProduct.id);
            var sameItem = JSON.parse(localStorage.cartList);
            for(var i = 0;i < sameItem.length; i++){
                if (ThisProduct.id === sameItem[i].id) {
                    sameItem[i].quantity += ThisProduct.quantity;
                    break;
                }
            }
            localStorage.setItem('cartList',JSON.stringify(sameItem))

        } else {
            //concat new object
            appendToStorage('cartList', ThisProduct)
        }
        setRefCounter(refCounter + 1)
    }

    useEffect(() =>{
        fetchProduct();
    },[searchTerm,fetchProduct])

    return <AppContext.Provider value={{loading,product,searchTerm,setSearchTerm, deleteCartItem,handleAddCart,refCounter, setRefCounter}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext,AppProvider}