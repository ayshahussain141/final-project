import React from 'react';
export default function Assignments(props) {
  const list = props.list;
  const listItems = list.map(lists =>
    <li key = {lists.assignmentId} className='list-unstyled liststyle'>
      <i className="fa-regular fa-circle" />
      <h6 className='d-inline m-2'>{lists.assignment}</h6>
      <div key={lists.assignmentId} className='mt-2 color margin-left'>
        <i><span className='d-block'>{lists.about}</span></i>
        <span className='d-block mt-1'>{lists.dateDue.split('T')[0]}</span>
      </div>
    </li>

  );
  return (
    <ul className='mt-3'>{listItems}</ul>
  );
}
