import React, {createContext, useContext, useState} from 'react'

const ProductContext = createContext()

const ProductProvider = ({children}) => { 
    const [product, setProduct] = useState({})
    
    return (
        <ProductContext.Provider value={{product, setProduct}}>
        {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)

export default ProductProvider