import React from 'react';
import Colors from './colors';
export default class CourseForm extends React.Component {

  render() {
    return (<div className={`row justify-content-center mt-5 pt-5 ${this.props.ButtonText}`}>
      <div className={`box ${this.props.ButtonText}`}>
        <div className='row text-center'>
          <form onSubmit={this.props.Submit}>
            <div className='row'>
              <div className='col-12 mt-4'>
                <div className='d-inline'><label data-color={this.props.Colors} className={`circle ${this.props.Colors} mt-1`} /></div>
                <label>
                  <input required type="text" className='searchbar' value={this.props.values} onChange={this.props.handle} />
                </label>
              </div>
            </div>
            <Colors onClick={this.props.Changecolors} />
            <div className='row'>
              <div className='col-12'>
                <button type="submit" className="btn bg-white text-danger outline-danger m-4">Add</button>
                <button onClick={this.props.Hide} type="button" className="btn bg-white text-danger outline-danger m-3">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }
}
