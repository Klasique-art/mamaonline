import React, {useContext, createContext, useState, useEffect} from 'react'

import products from '../api/products'
import categories from '../api/categories'

const AllProductsContext = createContext()

const AllProductsProvider = ({children}) => {
    const [allProducts, setAllProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [productsLoading, setProductsLoading] = useState(false)

    const fetchProducts = () => {
        setProductsLoading(true)
        products.getProducts().then((res) => {
            setAllProducts(res.data)
            setProductsLoading(false)
        }).catch((error) => {
            console.log("error fetching products", error)
            if(error.response) {
                console.log(error.response.data)
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log(error.message)
            }
        }).finally(() => {
            setProductsLoading(false)
        })
    }

    const fetchCategories = () => {
        categories.getCategories().then((res) => {
            setAllCategories(res.data)
        }).catch((error) => {
            console.log("error fetching categories", error)
            if(error.response) {
                console.log(error.response.data)
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log(error.message)
        }})
    }

  return (
    <AllProductsContext.Provider value={{
        allProducts,
        allCategories,
        fetchProducts,
        fetchCategories,
        productsLoading
    }}>
      {children}
    </AllProductsContext.Provider>
  )
}

export const useAllProducts = () => useContext(AllProductsContext)

export default AllProductsProvider