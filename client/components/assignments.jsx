import React from 'react';
export default class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentList: []
    };
    this.idNumber = React.createRef();
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch('/api/finalproject/assignment')
      .then(res => res.json())
      .then(data => {
        this.setState({
          assignmentList: data,
          toggle: 'fa-regular fa-circle-check'
        });
      })
      .catch(error => console.error(error));
  }

  toggle(event) {
    const toggleObject = this.state.assignmentList.find(assignment => assignment.assignmentId === Number(event.target.dataset.number));
    toggleObject.isCompleted = !toggleObject.isCompleted;
    if (toggleObject.isCompleted === true) {
      event.target.className = 'fa-regular fa-circle-check';
    } else if (toggleObject.isCompleted === false) {
      event.target.className = 'fa-regular fa-circle';
    }
    const reqObj = {};
    reqObj.isCompleted = toggleObject.isCompleted;
    fetch(`/api/finalproject/assignment/${event.target.dataset.number}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    })
      .then(res => res.json())
      .then(data => {
        const copy = [...this.state.assignmentList];
        copy.push(data);
        this.setState({
          assignmentList: copy
        });
      })
      .catch(err => console.error(err));
  }

  render(event) {
    const list = this.props.list;
    let button;
    const listItems = list.map(lists => {
      if (lists.isCompleted === false) {
        button = 'fa-regular fa-circle';
      } else if (lists.isCompleted === true) {
        button = 'fa-regular fa-circle-check';
      }
      return (<li key = {lists.assignmentId} className='list-unstyled liststyle'>
        <i onClick={this.toggle} data-number={lists.assignmentId} data-complete={lists.isCompleted} className={button} ref={this.idNumber}/>
        <h6 className='d-inline m-2'>{lists.assignment}</h6>
        <div key={lists.assignmentId} className='mt-2 color margin-left'>
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
