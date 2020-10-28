import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAttendance } from '../actions/actions';
import  jwt_decode  from 'jwt-decode';
import TopNav from './TopNav';
class Attendance extends Component {
   componentDidMount(){
       const decode = jwt_decode(localStorage.token)
       this.props.getAttendance(decode.student_id)
   } 
    render() {
        const {progress} = this.props.progress
        return (
            <div className="main-content position-relative">
            <TopNav/>
        <div class="page-content">
                <div className="card">
                <div class="card-header border-0">
                <div class="row align-items-center">
                <div class="media mt-4 align-items-center mx-auto">
                
                  <img alt="" src={progress ? progress.image : null} class="avatar avatar-lg"/>
                  <div class="media-body pl-3">
                  <div class="text-lg text-center my-0">{progress ? progress.fullName : null}</div>
                  <div class="text-lg text-center my-0">{progress ? progress.schoolName : null}</div>
                  <div class="text-lg text-center my-0">{progress ? progress.clas : null}</div>
                  </div>
                </div>
                </div>
              </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-items-center">
                                <thead>
                                    <tr>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Attendance</th>
                                        <th scope='col'>No. Of Assignments Given</th>
                                        <th scope='col'>No. Of Assignments Done</th>
                                        <th scope='col'>Incomplete Assignments</th>
                                        <th scope='col'>Behaviour</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        progress ? progress.attendance ?
                                        progress.attendance.map(progress=>{
                                            return(
                                            <tr>
                                                <td>{progress.day}/{progress.month}/{progress.year}</td>
                                        <td>{progress.attendance}</td>
                                        <td>{progress.allAssignment}</td>
                                        <td>{progress.assignmentDone}</td>
                                        <td>{progress.incompleteAssignment}</td>
                                        <td>{progress.behaviour}</td>
                                    </tr>
)
                                        })
                                    : null : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        )
    }
}
Attendance.propTypes={
    getAttendance:PropTypes.func.isRequired,
    progress:PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return{
        progress: state.progress
    }
}


export default connect(mapStateToProps, {getAttendance})(Attendance)
