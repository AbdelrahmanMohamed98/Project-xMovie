import React, { useEffect } from "react";
import "./App.scss";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  login,
  logout,
  selectUser,
} from "./redux/userSlice";
import "swiper/swiper.min.css";
import "./assets/boxicons-2.1.4/css/boxicons.min.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routes from "./config/Routes";
import Profile from "./pages/Profile/Profile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth) => {
        if (userAuth) {
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email,
            })
          );
        } else {
          dispatch(logout());
        }
      }
    );
    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <Switch>
          <Route
            path="/profile"
            component={Profile}
          />
          <Route
            render={(props) => (
              <>
                <Header {...props} />
                <Routes />
                <Footer />
              </>
            )}
          />
        </Switch>
      )}
    </Router>
  );
}

export default App;
