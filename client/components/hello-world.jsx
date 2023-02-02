import React from 'react';
import ListItems from './course';
import DeleteCourse from './delete';
import CourseForm from './courseform';
import Popup from './popup';

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      value: '',
      courseList: [],
      color: 'white',
      change: false,
      number: [],
      popup: null
    };
    this.AddClass = this.AddClass.bind(this);
    this.HideClass = this.HideClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.ChangeView = this.ChangeView.bind(this);
    this.ChangeSee = this.ChangeSee.bind(this);
    this.OpenPopup = this.OpenPopup.bind(this);
    this.deleteSubmit = this.deleteSubmit.bind(this);
    this.hidePage = this.hidePage.bind(this);
    this.hidePopup = this.hidePopup.bind(this);

  }

  AddClass() {
    this.setState({ isActive: true });
  }

  HideClass() {
    this.setState({
      isActive: false,
      value: '',
      color: 'white'
    });
  }

  componentDidMount() {
    const head = localStorage.getItem('react-context-jwt');
    fetch('/api/finalproject', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${head}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          courseList: data
        });
      })
      .catch(error => console.error(error));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isActive: false });
    const reqObj = {};
    reqObj.courseName = this.state.value;
    reqObj.colorCode = this.state.color;
    reqObj.userId = localStorage.getItem('user');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };
    fetch('/api/finalproject', req)
      .then(res => res.json())
      .then(data => {
        const courseCopy = [...this.state.courseList];
        courseCopy.push(data);
        this.setState({
          courseList: courseCopy,
          value: '',
          color: 'white'
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  colorChange(event) {
    this.setState({ color: event.target.dataset.color });
  }

  ChangeView(event) {
    const head = localStorage.getItem('react-context-jwt');
    const clickedId = parseInt(event.target.closest('li').getAttribute('data-number'));
    localStorage.setItem('id', clickedId);
    window.location.hash = 'assignments';
    if (window.location.hash === '#assignments') {
      fetch(`/api/finalproject/assignment/${clickedId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${head}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            clickedCourseAssignments: data
          });
        });
    }
  }

  ChangeSee() {
    this.setState({ isHidden: false });
  }

  hidePage(data) {
    this.setState({ change: false });
  }

  OpenPopup(event) {
    this.setState({ popup: true });
    const clickedId = Number(event.target.closest('i').getAttribute('id'));
    this.setState({ number: clickedId });
  }

  deleteSubmit(event) {
    this.setState({ popup: false });
    const id = this.state.number;
    const toggleObject = this.state.courseList.filter(course => course.courseId !== this.state.number);
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toggleObject)
    };
    fetch(`/api/finalproject/${id}`, req)
      .then(() => {
        this.setState({ courseList: toggleObject });
      })
      .catch(err => console.error(err));
  }

  hidePopup() {
    this.setState({
      popup: false
    });
  }

  render(event) {
    const buttonText = this.state.isActive ? 'view' : 'hidden';
    const changepagetwo = this.state.isHidden ? 'hidden' : 'view';
    const deletePopup = this.state.popup ? 'view' : 'hidden';
    return (<div className='container'>
      <div className="row">
        <div className='col-12'>
          <div className='row'>
            <Popup />
            <div className='col-12 text-end'>
              <i onClick={this.AddClass} className={`fa-solid fa-plus mt-5 ${changepagetwo}`} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-9 mx-auto">
        <div className={`ml-1 ${changepagetwo}`}>
          <h1>Courses</h1>
          <ListItems popup={this.OpenPopup} changeView={this.ChangeView} list={this.state.courseList}/>
        </div>
      </div>
      <CourseForm ButtonText={buttonText} Colors={this.state.color} Changecolors={this.colorChange} Hide={this.HideClass} handle={this.handleChange} values={this.state.value} Submit={this.handleSubmit}/>
      <DeleteCourse Hide={this.hidePopup} deleteSubmitform={this.deleteSubmit} delete={deletePopup}/>
    </div>
    );
  }
}
