import React from 'react'

const ErrorMessage = ({error, visible}) => {
    if (!error || !visible) return null
  return (
    <p className='text-red-400 text-sm text-center py-1' role='alert'>{error}</p>
  )
}

export default ErrorMessage