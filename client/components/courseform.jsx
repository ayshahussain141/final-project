import React from 'react';
import Colors from './colors';
export default class CourseForm extends React.Component {

  render() {
    return (<div className={`box ${this.props.ButtonText}`}>
      <div className='row text-center'>
        <form onSubmit={this.props.Submit}>
          <div className='col-12'>
            <div className='row'>
              <label data-color={this.props.Colors} className={`circle ${this.props.Colors} positions`} />
              <label>
                <input required type="text" className='searchbar' value={this.props.values} onChange={this.props.handle} />
              </label>
            </div>
          </div>
          <Colors onClick={this.props.Changecolors} />
          <div className='row'>
            <div className='col-9 margin'>
              <button type="submit" className="btn bg-white text-danger outline-danger m-3">Add</button>
              <button onClick={this.props.Hide} type="button" className="btn bg-white text-danger outline-danger m-3">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>);
  }
}
