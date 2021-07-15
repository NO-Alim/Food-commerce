import React,{useStatek,useContext,useEffect, useState, useCallback} from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('b');
    const [product, setProduct] = useState([]);

    let minPrice = Math.min.apply(null, product.map(item => item.price));
    let maxPrice = Math.max.apply(null, product.map(item => item.price));
    const percentage = 0.35;
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

    useEffect(() =>{
        fetchProduct();
    },[searchTerm,fetchProduct])

    return <AppContext.Provider value={{loading,product,searchTerm,setSearchTerm}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext,AppProvider}