import React, {useState} from 'react'
import { Link } from 'react-router-dom'

// custom imports

const mockSuggestions = [
    {
        id: 1,
        name: 'iphone 13 pro max',
        price: 2500,
        image: 'https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_UF1000,1000_QL80_.jpg',
        category: 'phones',
        link: '/phones/iphone-13-pro-max'
    },
    {
        id: 2,
        name: 'samsung galaxy s21 ultra',
        price: 2000,
        image: 'https://m.media-amazon.com/images/I/917nPCOw9-L._AC_UF1000,1000_QL80_.jpg',
        category: 'phones',
        link: '/phones/samsung-galaxy-s21-ultra'
    },
    {
        id: 3,
        name: 'macbook pro 2021',
        price: 3000,
        image: 'https://m.media-amazon.com/images/I/61cCf94xIEL._AC_SL1500_.jpg',
        category: 'laptops',
        link: '/laptops/macbook-pro-2021'
    },
    {
        id: 4,
        name: 'dell xps 13',
        price: 2500,
        image: 'https://images-cdn.ubuy.co.in/636dc91b6b30235ffc36a073-dell-xps-13-7390-13-3-intel-core.jpg',
        category: 'laptops',
        link: '/laptops/dell-xps-13'
    },
    {
        id: 5,
        name: 'sony playstation 5',
        price: 1500,
        image: 'https://starlite.com.gh/cdn/shop/products/sony-ps5-console-21.jpg?v=1606175872',
        category: 'consoles',
        link: '/consoles/sony-playstation-5'
    },
    {
        id: 6,
        name: 'microsoft xbox series x',
        price: 1200,
        image: 'https://m.media-amazon.com/images/I/61s248JDH+L._AC_SL1500_.jpg',
        category: 'consoles',
        link: '/consoles/microsoft-xbox-series-x'
    },
    {
        id: 7,
        name: 'samsung galaxy watch 4',
        price: 500,
        image: 'https://cdn.mos.cms.futurecdn.net/BfnZtDrEwhZvABetukx8aL-1200-80.jpg',
        category: 'watches',
        link: '/watches/samsung-galaxy-watch-4'
    },
    {
        id: 8,
        name: 'apple watch series 7',
        price: 700,
        image: 'https://www.cnet.com/a/img/resize/ee504b673071fd8d410dbcb671fb3458f3597361/hub/2022/04/26/0ae8cbf4-e3ed-408f-a0ce-722df0106dc8/applewatch-unitylights.jpg?auto=webp&width=1200',
        category: 'watches',
        link: '/watches/apple-watch-series-7'
    }
]

const SearchInput = ({styles,...otherProps}) => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setInputValue(value)
        console.log(value)

        if(value) {
            const filteredSuggestions = mockSuggestions.filter(suggestion => suggestion?.name.toLowerCase().includes(value.toLowerCase()))

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
                        to={suggestion.link} 
                        key={suggestion.id}  
                        className='flex items-center gap-2 p-2 hover:bg-slate-900 rounded-lg mb-1 bg-discount-gradient'
                    >
                        <img src={suggestion.image} alt={suggestion.name} className='w-14 h-14 rounded-lg' />
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