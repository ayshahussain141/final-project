import React from 'react';

export default class listItems extends React.Component {
  render() {
    const list = this.props.list;
    const listItems = list.map(lists =>
      <li key={lists.courseId} className='list-unstyled' data-number={lists.courseId} >
        <div >
          <div className={`side ${lists.colorCode}`}/>
          <div data-number={lists.courseId} className='shadow-lg p-4 mt-3 bg-blue border border-secondary'><p>{lists.courseName}</p></div>
        </div>
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
}
