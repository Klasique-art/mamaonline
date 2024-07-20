import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import pic1 from '../assets/pic1.png'
import { formatNumber } from '../utils/utils'
import SearchInput from './SearchInput'
import Footer from './Footer'
import { useProduct } from '../context/ProductProvider'
import { useAllProducts } from '../context/AllProductsProvider'
import { useCartItems } from '../context/CartItemsProvider'
import Pagination from './Pagination'
import CartToast from './CartToast'
import ProductsLoader from './ProductsLoader'

const MainMallContainer = ({ toggleSidebar,topBarStyle, ...otherProps }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(12)
  const { allProducts, fetchProducts, allCategories, fetchCategories, productsLoading } = useAllProducts()
  const { setProduct } = useProduct()
  const {cartItems, addToCart} = useCartItems()
  const [showToast, setShowToast] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // fetch products
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])
  // scroll to top on page load
  useEffect(()=> {
    window.scrollTo(0,0)
  }, [])

  const handleAddToCart = (item) => {
    addToCart(item)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // filter products by category
  const filteredProducts = selectedCategory ? allProducts?.filter((product) => product.category.name === selectedCategory) : allProducts

  // pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div {...otherProps}>
      {/* top bar */}
        <div className={`fixed top-0 left-0 p-2 bg-primary border-gradient sm:rounded-md main-mall-container ${topBarStyle} flex items-center justify-between z-[30]`}>
            <Button onClick={toggleSidebar} aria-label="toggle sidebar.">
                <i className="fas fa-bars"></i>
            </Button>
            <div className="">
                <Button styles="relative" aria-label="cart" linkTo="/cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                  <h2 className='absolute top-1 right-1 bg-black-gradient-2 px-[1px] py-[1px] h-5 w-5 flex-center text-white rounded-full text-xs'>{cartItems.length > 9? "9+": cartItems.length}</h2>
                </Button>
            </div>  
            <div className="w-12 h-12 cursor-pointer relative user-image" tabIndex="0">
              <img src={pic1} alt="user" className='w-full h-full object-cover rounded-full' />
              {/* user options */}
              <ul className='w-40 rounded-md p-2 absolute top-[105%] border-gradient bg-black-gradient right-1 user-options-box'>
                <li className='w-full h-10'>
                  <Link to="" className='w-full h-full flex-center hover:bg-[rgba(51,187,207,.6)] text-white p-0 duration-300 tracking-wide rounded-md'>Upload details</Link>
                </li>
                <li className='w-full h-10'>
                  <Link to="" className='w-full h-full flex-center hover:bg-[rgba(51,187,207,.6)] text-white p-0 duration-300 tracking-wide rounded-md'>Change password</Link>
                </li>
              </ul>
              {/* end of user options */}
            </div>
        </div>
        {/* end of top bar */}
        {/* main */}
        <main role='main' className='pt-20 pb-10'>
          <CartToast isVisible={showToast} />
          <h1 className="text-2xl font-bold mb-4 text-white text-center animate__animated animate__bounceInDown">Welcome to Mama online Mall</h1>
          {/* search bar */}
          <div className="w-full flex-col xs:flex-row flex items-center justify-between pb-6 gap-4">
            <button className='btn-glow bg-blue-gradient text-slate-800 py-2 px-5 rounded-[30px] z-[5] relative text-xs sm:text-sm category-btn'>Categories
              {/* categories box */}
              <ul className='absolute w-[200%] top-[105%] left-0 py-4 px-2 bg-primary rounded-md border-gradient category-box'>
                <li className='w-100% h-10'>
                    <Link 
                      className='w-full h-full flex-center hover:bg-[rgba(51,187,207,.6)] text-white p-0 duration-300 tracking-wide rounded-md'
                      onClick={()=> {
                        setSelectedCategory(null)
                        setCurrentPage(1)
                      }}
                    >All</Link>
                  </li>
                {allCategories?.map((category) => (
                  <li key={category.id} className='w-100% h-10'>
                    <Link 
                      className='w-full h-full flex-center hover:bg-[rgba(51,187,207,.6)] text-white p-0 duration-300 tracking-wide rounded-md'
                      onClick={()=> {
                        setSelectedCategory(category.name)
                        setCurrentPage(1)
                      }}
                    >{category.name}</Link>
                  </li>
                ))}
              </ul>
              {/* end of categories box */}
            </button>
            <SearchInput style={{
              zIndex: 1, 
              position: 'relative',
              backgroundColor: 'rgba(0,0,0,.1)',
              animationDelay: ".5s"
               }} styles="search-form-width animate__animated animate__bounceInDown" />
          </div>
          {/* end of search bar */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 py-5 relative min-h-[50vh]">
            {allProducts.length < 1 && !productsLoading < 1 && (
              <h2 className='text-gradient text-center text-2xl mt-5'>There are no products in our database.</h2>
            )}
            {<ProductsLoader visible={productsLoading}/>}
            {currentProducts?.map((item) => {
              return (
                <Link 
                  key={item?.id} 
                  className="card p-2 rounded shadow border-gradient" 
                  tabIndex="0" 
                  to={`/details/${item?.slug}`} 
                  onClick={() => setProduct(item)}
                >
                  <div className="w-full relative" data-aos="fade-up" data-aos-delay="100">
                    <div className="absolute bottom-2 right-2 rounded-[50%20%20%10%] p-2 bg-black-gradient text-cyan-200 text-sm">{item?.condition}</div>
                    <div className="w-full h-36 md:h-44 mb-2 border-gradient rounded-md p-1" >
                      <img src={item?.images[0].image} alt="" className='w-full h-full object-contain' />
                    </div>
                    <h3 className="font-bold text-white truncate">Product {item?.name}</h3>
                    <div className="flex items-center gap-2"> 
                      <p className="text-gray-400 line-through text-sm sm:text-lg" aria-label='old price'>$ {formatNumber(Number(item?.original_price))}</p>
                      <p className="text-xl sm:text-2xl text-gradient" aria-label='new price'>$ {formatNumber(Number(item?.discounted_price))}</p>
                    </div>
                    <p className='truncate-3 text-white mb-2'>{item?.description}</p>
                    <Button 
                      style={{
                        padding: '6px 12px',
                      }} 
                      title="Add to cart"
                      onClick={()=> handleAddToCart(item)}
                    />
                  </div>
                </Link>
              )
              }
            )}
          </div>
          <Pagination 
            productsPerPage={productsPerPage} 
            totalProducts={filteredProducts.length} 
            paginate={paginate}
            currentPage={currentPage}
          />
        </main>
        {/* end of main */}
        <Footer />
    </div>
  )
}

export default MainMallContainer