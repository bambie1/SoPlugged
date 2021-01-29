import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import EditBusiness from "./pages/EditBusiness";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import BusinessPreview from "./pages/BusinessPreview";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import PrivateRoute from "./react-router/PrivateRoute";
import "./App.css";
import { useAuth } from "./contexts/AuthContext";
import { auth } from "./firebase/firebase.utils";
import DirectoryPage from "./pages/DirectoryPage";
import UnknownUrl from "./pages/UnknownUrl";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./react-router/ProtectedRoute";

function App() {
  const { setCurrentUser } = useAuth();
  let history = useHistory();

  if (auth.isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    auth
      .signInWithEmailLink(email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem("emailForSignIn");
        setCurrentUser(result.user);
        history.push("/my-business");
        // return <EditBusiness />;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/join">
            <SignInPage register={true} />
          </Route>
          <PrivateRoute path="/my-business">
            <EditBusiness />
          </PrivateRoute>
          <ProtectedRoute path="/preview">
            <BusinessPreview />
          </ProtectedRoute>
          <Route path="/sign-in">
            <SignInPage register={false} />
          </Route>
          <Route path="/search" component={DirectoryPage} />
          <Route path="*" exact={true} component={UnknownUrl} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
