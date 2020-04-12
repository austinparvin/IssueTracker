import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'
import './custom.scss'
import MyIssues from './pages/MyIssues'
import AddIssue from './pages/AddIssue'
import IssueDetails from './pages/IssueDetails'
import ClosedIssues from './pages/ClosedIssues'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={MyIssues} />
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
