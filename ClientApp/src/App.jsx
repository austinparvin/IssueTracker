// src/App.js

import React from 'react'
import NavBar from './components/NavBar'
import { useAuth0 } from './react-auth0-spa'

import { Router, Route, Switch } from 'react-router-dom'
import Profile from './components/Profile'
import history from './utils/history'
import './custom.scss'
import PrivateRoute from './components/PrivateRoute'
import MyIssues from './pages/MyIssues'
import AvailIssues from './pages/AvailIssues'
import CreateIssue from './pages/CreateIssue'
import ClosedIssues from './pages/ClosedIssues'
import EditIssue from './pages/EditIssue'
import IssueDetails from './pages/IssueDetails'
import NotFound from './pages/NotFound'

function App() {
  const { isAuthenticated, loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={isAuthenticated ? 'App' : 'PromoApp'}>
      <Router history={history}>
        <header className="links">
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/issues/my" component={MyIssues} />
          <PrivateRoute path="/issues/open" component={AvailIssues} />
          <PrivateRoute path="/issues/create" component={CreateIssue} />
          <PrivateRoute path="/issues/closed" component={ClosedIssues} />
          <PrivateRoute
            exact
            path="/issue/edit/:issueId"
            component={EditIssue}
          />
          <PrivateRoute
            exact
            path="/issue/details/:issueId"
            component={IssueDetails}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
