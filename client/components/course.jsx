import React from 'react';

export default class listItems extends React.Component {
  render() {
    const list = this.props.list;
    const listItems = list.map(lists =>
      <li key={lists.courseId} className='list-unstyled'>
        <div className={`side ${lists.colorCode}`}/>
        <div className='shadow-lg p-4 mt-3 bg-blue border border-secondary'><p>{lists.courseName}</p></div>
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
}
