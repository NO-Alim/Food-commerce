import React,{useStatek,useContext,useEffect, useState, useCallback} from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('b');
    const [product, setProduct] = useState([]);

    const fetchProduct = useCallback( async () => {
        setLoading(true);
        try {
            const response = await fetch (`${url}${searchTerm}`)
            const data = await response.json();
            const {drinks} = data;
            console.log(drinks);
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
                      IntroThree: strInstructionsIT
                    }
                  })
                setProduct(newProduct);
            } else {
                setProduct([])
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false)
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