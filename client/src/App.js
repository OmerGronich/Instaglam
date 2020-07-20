import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'App.scss';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import SignUpForm from 'components/AuthForm/SignUpForm/SignUpForm';
import LogInForm from 'components/AuthForm/LogInForm/LogInForm';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import { loadUser } from 'actions/auth/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route path="/accounts/welcomepage" component={WelcomePage} />
          <Route path="/accounts/emailsignup" exact component={SignUpForm} />
          <Route path="/accounts/login" exact component={LogInForm} />
          <ProtectedRoute path="/p/:postId" component={() => <h1>Post page...</h1>} />
          <ProtectedRoute
            exact
            path="/explore"
            component={() => <div>Explore!</div>}
          />
          <ProtectedRoute
            exact
            path="/direct/inbox"
            component={() => <div>Chat!</div>}
          />
          <ProtectedRoute path="/:profile" component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
