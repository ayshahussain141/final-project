import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
export default class AuthPage extends React.Component {
  static contextType = AppContext;
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
    return (
      <div className="row pt-5">
        <div className="col-12">
          <div className='col-11 text-center'>
            <h2 className="mb-2">
              SchoolifeZen
            </h2>
            <p className="text-muted mb-4">{welcomeMessage}</p>
          </div>
          <div className= "col-11 text-center m-2">
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}
