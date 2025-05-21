import React, { createContext, useState } from 'react'

export const SearchContext =  createContext()
const SearchContextProvider = ({ children }) => {
  
   const [searchKeyword, setSearchKeyword] = useState("");
   return (
    <div>
         <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </SearchContext.Provider>
    </div>
  )
}

export default SearchContextProvider