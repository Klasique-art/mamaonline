import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

// custom imports
import { useAllProducts } from '../context/AllProductsProvider'

const SearchInput = ({styles,...otherProps}) => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const { allProducts, fetchProducts } = useAllProducts()

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleChange = (e) => {
        const value = e.target.value
        setInputValue(value)

        if(value) {
            const filteredSuggestions = allProducts?.filter(suggestion => suggestion?.name.toLowerCase().includes(value.toLowerCase()))

            setSuggestions(filteredSuggestions)
            setShowSuggestions(true)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

  return (
    <form action="#" {...otherProps} className={`w-[95%] max-w-[800px] h-16 sm:h-20 flex items-center ${styles} bg-primary rounded-[10px] gap-2 justify-center shadow-md shadow-[rgba(255,255,255,.05)] z-[999] duration-300 search-bar`} 
    role='search'
    >
        <input 
            type="search"
            className='h-10 sm:h-12 rounded-[30px] w-[85%] bg-black-gradient-2 px-4 py-1 search-input text-white text-lg md:text-xl'
            placeholder='search products...'
            value={inputValue}
            onChange={handleChange}
        />
        <button 
            type="submit" 
            className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-gradient duration-300 hover:-translate-y-1 text-xl text-slate-900'
            aria-label='search'
        >
            <i className="fa-solid fa-magnifying-glass-dollar"></i>
        </button>
        {/* suggestion box */}
        {suggestions.length > 0 && (
            <div className="absolute top-[115%] w-[85%] bg-blue-gradient text-white rounded-lg shadow-lg z-10 p-2 max-h-[400px] overflow-y-auto">
                {suggestions.map((suggestion) => (
                    <Link 
                        to={`/details/${suggestion?.slug}`}
                        key={suggestion?.id}  
                        className='flex items-center gap-2 p-2 hover:bg-slate-900 rounded-lg mb-1 bg-discount-gradient'
                        // make the search bar disappear when a suggestion is clicked
                        onClick={() => setSuggestions([])}
                    >
                        <img src={suggestion.images[0].image} alt={suggestion.name} className='w-14 h-14 rounded-lg' />
                        <div>
                            <h3>{suggestion.name}</h3>
                            <p>{suggestion.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
        {/* end of suggestion box */}
    </form>
  )
}

export default SearchInput