import React from 'react'
import { Link } from 'react-router-dom'

// custom imports
import styles from '../config/styles'

const FunBigButton = ({text1="Begin", text2="Shopping", linkTo}) => (
    <Link to={linkTo} className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] bounce_subtle`}>
        <div className={`${styles.flexCenter} flex-col bg-primary w-full h-full rounded-full gap-2`}>
            <div className={`${styles.flexStart} flex-row`}>
                <p className='font-medium text-[18px] leading-[22px]'>
                    <span className='text-gradient'>{text1}</span>
                </p>
                <i className='fas fa-arrow-right ml-2 text-gradient -rotate-45 text-[20px]' />
            </div>
            <p className='font-medium text-[18px] leading-[22px] text-left'>
                <span className='text-gradient'>{text2}</span>
            </p>
        </div>
    </Link>
)

export default FunBigButton