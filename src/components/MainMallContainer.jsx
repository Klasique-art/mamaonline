import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import pic1 from '../assets/pic1.png'
import { formatNumber } from '../utils/utils'
import SearchInput from './SearchInput'
import Footer from './Footer'
import { useProduct } from '../context/ProductProvider'
import products from '../api/products'

const MainMallContainer = ({ toggleSidebar,topBarStyle, ...otherProps }) => {
  const [allProducts, setAllProducts] = useState([])
  const { setProduct } = useProduct()

  const fetchProducts = () => {
    products.getProducts().then((res) => {
      setAllProducts(res.data)
    }).catch((error) => {
      console.log("error fetching products", error)
      if(error.response) {
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log(error.message)
      }
    })
  }

  // fetch products
  useEffect(() => {
    fetchProducts()
  }, [])
  // scroll to top on page load
  useEffect(()=> {
    window.scrollTo(0,0)
  }, [])

  console.log(allProducts)

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
                    <h2 className='absolute top-1 right-1 bg-black-gradient-2 px-[1px] py-[1px] h-5 w-5 flex-center text-white rounded-full text-sm'>0</h2>
                </Button>
            </div>  
            <div className="w-12 h-12 cursor-pointer" tabIndex="0">
              <img src={pic1} alt="user" className='w-full h-full object-cover rounded-full' />
            </div>
        </div>
        {/* end of top bar */}
        {/* main */}
        <main role='main' className='pt-20 pb-10'>
          <h1 className="text-2xl font-bold mb-4 text-white text-center animate__animated animate__bounceInDown">Welcome to Mama online Mall</h1>
          {/* search bar */}
          <div className="w-full flex-col xs:flex-row flex items-center justify-between pb-6 gap-4">
            <button className='btn-glow bg-blue-gradient text-slate-800 py-2 px-5 rounded-[30px] z-[5] relative text-xs sm:text-sm category-btn'>Categories
              {/* categories box */}
              <ul className='absolute w-[200%] top-[105%] left-0 py-4 px-2 bg-primary rounded-md border-gradient category-box'>
                <li className='w-100% h-10'>
                  <Link to="" className='w-full h-full flex-center hover:bg-[rgba(51,187,207,.6)] text-white p-0 duration-300 tracking-wide rounded-md'>Electronics</Link>
                </li>
                <li className='w-100% h-10'>
                  <Link to="" className='w-full h-full flex-center hover:bg-[rgba(51,187,207,.6)] text-white p-0 duration-300 tracking-wide rounded-md'>fashion</Link>
                </li>
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
            {allProducts.length < 1 && (
              <h2 className='text-gradient text-center text-2xl mt-5'>There are no products in our database.</h2>
            )}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 py-5">
            {/* Dummy product cards */}
            {allProducts?.map((item) => {
              return (
                <Link 
                  key={item?.id} 
                  className="card p-2 rounded shadow border-gradient" 
                  tabIndex="0" 
                  to={`/details/${item}?.id`} 
                  onClick={() => setProduct(item)}
                >
                  <div className="w-full" data-aos="fade-up" data-aos-delay="100">
                    <div className="w-full h-36 md:h-44 mb-2 border-gradient rounded-md p-1" >
                      <img src={item?.image} alt="" className='w-full h-full object-contain' />
                    </div>
                    <h3 className="font-bold text-white truncate">Product {item?.name}</h3>
                    <div className="flex items-center gap-2"> 
                      <p className="text-gray-400 line-through text-sm sm:text-lg" aria-label='old price'>$ {formatNumber(Number(item?.original_price))}</p>
                      <p className="text-xl sm:text-2xl text-gradient" aria-label='new price'>$ {formatNumber(Number(item?.discounted_price))}</p>
                    </div>
                    <p className='truncate-3 text-white mb-2'>{item?.description}</p>
                    <Button style={{
                      padding: '6px 12px',
                    }} title="Add to cart"/>
                  </div>
                </Link>
              )
              }
            )}
          </div>
        </main>
        {/* end of main */}
        <Footer />
    </div>
  )
}

export default MainMallContainer