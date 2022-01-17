import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Redirect, Switch } from "react-router"
//import { styled } from "@mui/system"
//import { Container } from "@mui/material"
import "./App.css"
import SignIn from "../../pages/SignIn"
import Profile from "../../pages/Profile"
import Home from "../../pages/Home"
import AdminDetail from "../../pages/Admin"
import UserDetail from "../../pages/User"
import ClassDetail from "../../pages/Class"


// const StyledContainer = styled(Container)(({ theme }) => ({
//   marginTop: theme.spacing(3),
//   marginBottom: theme.spacing(3),
// }))

function App() {
  console.log("hello")
  return (
    <Router>
          <>
            <Switch>
              {/* <Route
                exact
                path="/"
                render={() => {
                  if (localStorage.isSocialLogin || localStorage.isLogin) {
                    return <ClassList />
                  } else {
                    return <Redirect to="/sign-in" />
                  }
                }}
              /> */}
              <Route exact path="/"
              render={() => {
                if (localStorage.isLogin) {
                  return <Home />
                } else {
                  return <Redirect to="/sign-in" />
                }
              }}>
                
              </Route>

              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/admin/*">
                <AdminDetail />
              </Route>
              <Route exact path="/user/*">
                <UserDetail />
              </Route>
              <Route exact path="/class/*">
                <ClassDetail />
              </Route>
            </Switch>
          </>
    </Router>
  )
}

export default App
