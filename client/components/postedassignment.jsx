// import React from 'react';
// import Assignments from './assignments';
// // import { Course } from './hello-world';

// export default class Posted extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       assignmentList: [],
//       courseList: []

//     };
//     this.toggle = this.toggle.bind(this);
//   }

//   componentDidMount() {
//     const head = localStorage.getItem('react-context-jwt');
//     fetch('/api/finalproject', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Access-Token': `${head}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           courseList: data
//         });
//       })
//       .catch(error => console.error(error));

//     fetch('/api/finalproject/assignment')
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           assignmentList: data
//         });
//       })
//       .catch(error => console.error(error));
//   }

//   toggle(event) {
//     const toggleObject = this.state.assignmentList.find(assignment => assignment.assignmentId === Number(event.target.dataset.number));
//     // console.log(event.target);
//     toggleObject.isCompleted = !toggleObject.isCompleted;
//     if (toggleObject.isCompleted === true) {
//       event.target.className = 'fa-regular fa-circle-check';
//     } else if (toggleObject.isCompleted === false) {
//       event.target.className = 'fa-regular fa-circle';
//     }
//     const reqObj = {};
//     reqObj.isCompleted = toggleObject.isCompleted;
//     fetch(`/api/finalproject/assignment/${event.target.dataset.number}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(reqObj)
//     })
//       .then(res => res.json())
//       .then(data => {
//         const copy = [...this.state.assignmentList];
//         copy.push(data);
//         this.setState({
//           assignmentList: copy
//         });
//       })
//       .catch(err => console.error(err));
//   }

//   render() {
//     // console.log(this.state.assignmentList);
//     console.log(this.state.courseList);

//     return (
//       <div>
//         <Course/>
//         {/* <Assignments Toggle={this.toggle} list={this.state.assignmentList} /> */}
//       </div>
//     );
//   }
// }
