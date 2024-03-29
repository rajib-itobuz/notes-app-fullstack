import React, { useContext } from 'react'
import { ThemeContext } from './tempPage'

const Card = () => {
    const value = useContext(ThemeContext);
    return (
        <h1>{value}</h1>
    )
}

export default Card