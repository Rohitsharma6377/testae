'use client'

import React, { createContext, useState } from 'react';


const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

  //SlidingForm
  const [isOpen, setIsOpen] = useState(false);
  
  const openForm = () => {
    setIsOpen(!isOpen);
  }
  
  const closeForm = () => {
    setIsOpen(false);
  }
    
    
  //SearchBar
  const [searchTerm, setSearchTerm] = useState('');


  //TableRowsToShow
  const [itemsPerPage, setItemsPerPage] = useState(null)

  return (
    <MyContext.Provider value={{ isOpen, setIsOpen, openForm, closeForm, searchTerm, setSearchTerm, itemsPerPage, setItemsPerPage }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;