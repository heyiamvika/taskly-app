import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from "./utils/routes";

import { HomePage } from "./components/_pages/HomePage/HomePage";
import { WelcomePage } from "./components/_pages/WelcomePage/WelcomePage";
import { SignUpPage } from "./components/_pages/SignUpPage/SignUpPage";
import { LoginPage } from "./components/_pages/LoginPage/LoginPage";

import { withFirebase } from "./components/Firebase/index";
import {
  AuthUserContext,
  withAuthentification,
  withAuthorization,
} from "./components/Session";

import { db } from "./firebase/firebaseConfig";

// const HomePageWithFirebase = withFirebase(
//   withAuthentification(withAuthorization(HomePage))
// );

function App(props: any) {
  console.log("db", db);
  //   const [user, setUser] = useState<{} | null>(null);

  useEffect(() => {
    db.collection("users")
      .add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });

  //   useEffect(() => {
  //     //componentDidMount
  //     //componentDidUpdate
  //     props.firebase.auth.onAuthStateChanged((authUser: any) => {
  //       authUser ? setUser(authUser) : setUser(null);
  //     });
  //   });

  return (
    // <AuthUserContext.Provider value={user}>
    <Router>
      <div className="app">
        {/* <Route exact path={ROUTES.WELCOME_SCREEN} component={WelcomePage} /> */}
        <Route path={ROUTES.MAIN_SCREEN} component={HomePage} />
        {/* <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} /> */}
      </div>
    </Router>
    // </AuthUserContext.Provider>
  );
}

// export default withFirebase(App);

export default App;
