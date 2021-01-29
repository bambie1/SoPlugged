import React, { useState, createContext, useContext } from "react";

const SearchContext = createContext();
export const useSearch = () => {
  return useContext(SearchContext);
};

export function SearchProvider({ children }) {
  const [contextLocation, setContextLocation] = useState("");
  const [contextCategory, setContextCategory] = useState("");
  const [businessList, setBusinessList] = useState([]);

  const value = {
    contextLocation,
    setContextLocation,
    contextCategory,
    setContextCategory,
    businessList,
    setBusinessList,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
