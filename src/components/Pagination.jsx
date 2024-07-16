import React from 'react'

const Pagination = ({productsPerPage, totalProducts, paginate, currentPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
    
  return (
    <nav className='flex justify-center items-center gap-2' role='navigation'>
        <ul className='pagination'>
            {pageNumbers.map(number => (
                <li className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a key={number} href='#' onClick={()=> paginate(number)} className='page-link'>{number}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination