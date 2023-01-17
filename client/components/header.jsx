import React from 'react';

export default function Header(props) {
  return <div className="navbar navbar-expand-lg navbar-light bg-light">
    <h2>SchoolZen</h2>
    <a href='#sign-up'><h6>Signup</h6></a>
    <a href='#sign-in'><h6>SignIn</h6></a>
  </div>;
}
