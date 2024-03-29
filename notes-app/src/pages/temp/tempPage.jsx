import React, { createContext } from 'react'
import Card from './card'

export const ThemeContext = React.createContext("light");

const TempPage = () => {
    console.log("hello");
    return (
        <ThemeContext.Provider value="adasdas">
            <Card />
        </ThemeContext.Provider>
    )
}

export default TempPage
