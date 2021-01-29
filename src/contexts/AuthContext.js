import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.utils";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentBusiness, setCurrentBusiness] = useState(null);

  const [isNewBusiness, setIsNewBusiness] = useState(true);
  const [loading, setLoading] = useState(true);

  const sendLink = (userMail) => {
    return auth
      .sendSignInLinkToEmail(userMail, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", userMail);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };
  var actionCodeSettings = {
    url: process.env.REACT_APP_URL,
    handleCodeInApp: true,
  };
  const signOut = () => {
    localStorage.clear();
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const getUserToken = async () => {
    return currentUser?.getIdToken();
  };

  const value = {
    currentUser,
    currentBusiness,
    setCurrentBusiness,
    sendLink,
    signOut,
    getUserToken,
    isNewBusiness,
    setIsNewBusiness,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
