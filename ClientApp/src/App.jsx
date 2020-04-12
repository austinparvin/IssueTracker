import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { Layout } from './components/Layout'
import NotFound from './pages/NotFound'
import './custom.scss'
import MyIssues from './pages/MyIssues'
import AddIssue from './pages/AddIssue'
import IssueDetails from './pages/IssueDetails'
import ClosedIssues from './pages/ClosedIssues'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      //home page should be and about and adds with a login/signup link in the nav
      // if logged in then layout should change and myissues should be "homepage"
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (localStorage.getItem('token')) {
                return <MyIssues />
              } else {
                return <Redirect to="/signup" />
              }
            }}
          />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/issues/my" component={MyIssues} />
          <Route exact path="/issues/closed" component={ClosedIssues} />
          <Route exact path="/issues/add" component={AddIssue} />
          <Route
            exact
            path="/issue/details/:issueId"
            component={IssueDetails}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
