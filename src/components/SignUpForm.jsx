import React, { useState } from 'react'
import * as Yup from 'yup'

import { SubmitButton, FormField, Form } from './form'
import {useAuth} from '../context/AuthProvider' 

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name").min(3).label("Name"),
    email: Yup.string().required("Please enter email").email().label("Email"),
    password: Yup.string().required("Please insert password").min(8).label("Password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password must contain at least one uppercase, lowercase and number"
    ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Please confirm your password")
}) //

const SignUpForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const {register} = useAuth()

    const handleSubmit = async ({name, email, password, confirmPassword}) => {
        try {
            await register(name.trim(), email.trim(), password, confirmPassword)
            console.log({name, email, password, confirmPassword})
        } catch (error) {
            console.log("error signing up", error)
        }
    }

    return (
        <div className="w-full pb-6 px-5 flex-center flex-col rounded-lg">
            <div className="h-10 text-center text-2xl w-full py-1">
                <h2 
                    className='text-gradient animate__animated animate__bounceInDown'
                    style={{
                        animationDelay: '0.05s'
                    }}
                >Sign Up Form</h2>
            </div>
            <div className="w-full ">
                <Form
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <div 
                        className="w-full my-8 animate__animated animate__bounceInDown"
                        style={{
                            animationDelay: '0.3s'
                        }}
                    >
                        <FormField
                            icon="user"
                            placeholder="John Doe"
                            label="Name"
                            name="name"
                        />
                    </div>
                    <div 
                        className="w-full my-8 animate__animated animate__bounceInDown"
                        style={{
                            animationDelay: '0.5s'
                        }}
                    >
                        <FormField
                            icon="envelope"
                            placeholder="john@example.com"
                            label="Email"
                            name="email"
                        />
                    </div>
                    <div 
                        className="w-full my-8 animate__animated animate__bounceInDown"
                        style={{
                            animationDelay: '0.7s'
                        }}
                    >
                        <FormField
                            icon={passwordVisible ? "eye-slash" : "eye"}
                            placeholder="Password"
                            label="Password"
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            onIconClick={() => setPasswordVisible(prev => !prev)}
                            ariaLabel={passwordVisible ? "Hide password" : "Show password"}
                        />
                    </div>
                    <div 
                        className="w-full mt-8 mb-5 animate__animated animate__bounceInDown"
                        style={{
                            animationDelay: '0.9s'
                        }}
                    >
                        <FormField
                            icon={confirmPasswordVisible ? "eye-slash" : "eye"}
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            type={confirmPasswordVisible ? "text" : "password"}
                            name="confirmPassword"
                            onIconClick={() => setConfirmPasswordVisible(prev => !prev)}
                            ariaLabel={confirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                        />
                    </div>
                    <div 
                        className="w-full py-1 md:py-4 flex-center animate__animated animate__bounceInDown"
                        style={{
                            animationDelay: '1.1s'
                        }}
                    >
                        <SubmitButton title="Sign Up"/>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignUpForm