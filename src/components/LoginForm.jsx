import React, {useState} from 'react'
import * as Yup from 'yup'

import { SubmitButton, FormField, Form } from './form'
import { Link } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter email").email().label("Email"),
    password: Yup.string().required("Please insert password").min(8).label("Password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Password must contain at least one uppercase, lowercase and number"
    )
})

const LoginForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="w-full pb-6 px-5 flex-center flex-col rounded-lg">
        <div className="h-10 text-center text-2xl w-full py-1">
            <h2 
                className='text-gradient animate__animated animate__bounceInDown'   
                style={{animationDelay: '0.05s'}}
            >Login Form</h2>
        </div>
        <div className="w-full ">
            <Form
                initialValues={{email: '', password: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                <div 
                    className="w-full my-8 animate__animated animate__bounceInDown"
                    style={{animationDelay: '0.3s'}}
                >
                    <FormField
                        icon="envelope"
                        placeholder="bi@wultam.np"
                        label="Email"
                        name="email"
                    />
                </div>
                <div 
                    className="w-full animate__animated animate__bounceInDown"
                    style={{animationDelay: '0.5s'}}
                >
                    <FormField
                        icon={passwordVisible ? "eye-slash" : "eye"}
                        placeholder="password"
                        label="Password"
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        onIconClick={() => setPasswordVisible(prev => !prev)}
                        ariaLabel={passwordVisible ? "Hide password" : "Show password"}
                    />
                </div>
                <div 
                    className="w-full py-4 flex-center animate__animated animate__bounceInDown"
                    style={{animationDelay: '0.7s'}}
                >
                    <SubmitButton title="Login"/>
                </div>
                <div 
                    className="text-center p-2 rounded-md animate__animated animate__bounceInDown"
                    style={{animationDelay: '0.9s'}}
                >
                    <Link to="/auth/forgot-password" className="text-[#33bbcf] " >forgot password?</Link>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default LoginForm