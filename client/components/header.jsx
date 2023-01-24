import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  static contextType = AppContext;
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          SchoolifeZen
          <div>
            {user !== null &&
              <button className="btn btn-outline-dark m-1" onClick={handleSignOut}>
                Sign out
                <i className="ms-2 fas fa-sign-out-alt" />
              </button>
            }
            {user === null &&
              <>
                <a href="#sign-in" className="btn btn-outline-primary">
                  <i className="fa-solid fa-right-to-bracket  p-1" />
                  Sign In
                </a>
                <a href="#sign-up" className="btn btn-outline-dark">
                  <i className="fa-solid fa-user p-1" />
                  Sign Up
                </a>
              </>
            }
          </div>
        </div>
      </nav>
    );
  }
}
