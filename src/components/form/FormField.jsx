import React from 'react'
import { useFormikContext } from 'formik'

import InputField from '../InputField'
import ErrorMessage from './ErrorMessage'

const FormField = ({name, ...otherProps}) => {
    const { handleChange, setFieldTouched, touched, errors } = useFormikContext()
  return (
    <>
        <InputField
            onChange={handleChange(name)}
            onBlur={()=> setFieldTouched(name)}
            {...otherProps}
        />
        <ErrorMessage visible={touched[name]} error={errors[name]}/>
    </>
  )
}

export default FormField