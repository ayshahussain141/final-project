import React from 'react';
export default class Assignments extends React.Component {

  render(event) {
    const list = this.props.list;
    let button;
    const listItems = list.map(lists => {
      const two = new Date(lists.dateDue);
      const one = new Date();

      if (lists.isCompleted === false) {
        button = 'fa-regular fa-circle';
      } else if (lists.isCompleted === true) {
        button = 'fa-regular fa-circle-check';
      }

      let dates;
      let className;
      if (one > two) {
        dates = 'Late';
        className = 'margin-subtract';
      }
      return (<li key = {lists.assignmentId} className='list-unstyled liststyle'>
        <div className='row'>
          <p className='text-end color-red'>{dates}</p>
          <div className={`col-12 ${className}`} >
            <i onClick={this.props.Toggle} data-number={lists.assignmentId} data-complete={lists.isCompleted} className={button}/>
            <h6 className='d-inline m-2'>{lists.assignment}</h6>
          </div>
        </div>
        <div key={lists.assignmentId} className='mt-2 color margin'>
          <i><span className='d-block'>{lists.about}</span></i>
          <span className='d-block mt-1'>{lists.dateDue.split('T')[0]}</span>
        </div>
      </li>);
    }
    );
    return (
      <ul className='mt-3'>{listItems}</ul>
    );
  }
}
