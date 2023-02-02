import React from 'react';
import Course from '../components/hello-world';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  static contextType = AppContext;
  render() {
    return (
      <div>
        <Course />
      </div>
    );
  }
}
