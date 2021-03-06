import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
export default class sidenav extends Component {
  logOut=()=>{
    localStorage.removeItem('token')
    window.location= '/'
  }
    render() {
      const decode = jwt_decode(localStorage.token)
        return (
            <div className="sidenav show" id="sidenav-main">
      <div className="sidenav-header d-flex align-items-center">
        <Link className="navbar-brand" to='/'>
          {/* <img src="../..//img/brand/white.png" className="navbar-brand-img" alt="..."/> */}
          <h4 className='text-white' style={{fontSize:'24px',fontFamily:'cursive'}}><i className='far fa-graduation-cap'/> {' '}SMS</h4>
        </Link>
        <div className="ml-auto">
          <div className="sidenav-toggler sidenav-toggler-dark d-md-none active" data-action="sidenav-unpin" data-target="#sidenav-main">
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line bg-white"></i>
              <i className="sidenav-toggler-line bg-white"></i>
              <i className="sidenav-toggler-line bg-white"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="sidenav-user d-flex flex-column align-items-center justify-content-between text-center">
        <div>
          <Link to='/' className="avatar  avatar-xl">
            {
              decode.type==='owner' ?
              <img alt="" src={decode.logo} className=""/>
              :
              <>
              {
                decode.image==='no image' ? 
                <div className="card-profile-image avatar avatar-xl bg-primary rounded-circle shadow hover-shadow-lg">
                    <h1 className='text-white'>
                        {decode.surname.slice(0,1)}{decode.name.slice(0,1)}
                        </h1>
                </div>
                :
            <img alt="" src={decode.image} class="card-profile-image avatar avatar-xl rounded-circle shadow hover-shadow-lg"/>
            }
            </>
            }
          </Link>
          <div className="mt-4">
            <h5 className="mb-0 text-white">
              {
              decode.type==='owner' 
              ? 
              decode.schoolName 
              : 
              (decode.surname+' '+decode.name)
              }
              </h5>
            <span className="d-block text-sm text-white opacity-8 mb-3">
              {
            decode.type==='owner' 
            ? 
            decode.school_id 
            : 
            decode.type==='teacher' 
            ? 
            decode.teacher_id 
            : 
            decode.student_id
            }
            </span>
            <a href="#" className="btn btn-sm btn-white btn-icon rounded-pill shadow hover-translate-y-n3">
              <span className="btn-inner--icon"><i className="far fa-user-graduate"></i></span>
              <span className="btn-inner--text">{decode.clas}</span>
            </a>
          </div>
        </div>
        {
          decode.type==='owner'?
        <div className="w-100 mt-4 actions d-flex justify-content-between">
          <Link to="/teachers" className="action-item action-item-lg text-white pl-0">
            <i className="far fa-user-tie"></i>
          </Link>
          <Link to="/ptf" className="action-item action-item-lg text-white">
            <i className="far fa-comment-alt-dots"></i>
          </Link>
          <Link to="/students" className="action-item action-item-lg text-white pr-0">
            <i className="far fa-user-graduate"></i>
          </Link>
        </div>
        : null
        }
      </div>
      <div className="nav-application clearfix">
        <NavLink to="/profile" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-home fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Home</span>
        </NavLink>
        {
        decode.type==='student' ?
        <NavLink to="/result" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-list-alt fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Results</span>
        </NavLink>
        :
        <NavLink to="/students" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-user-graduate fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Students</span>
        </NavLink>
      }
        
{ decode.type==='owner' ?
        <NavLink to="/teachers" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-user-tie fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Teachers</span>
        </NavLink>
        : null
}
        <NavLink to="/news" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-newspaper fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">News</span>
        </NavLink>
{ decode.type==='owner' ?
        <NavLink to="/bills" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-money-bill fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Bills</span>
        </NavLink>
        : null
}        
        <NavLink to="/ptf" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-comment-alt-dots fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">PTF</span>
        </NavLink>
        {
          decode.type==='student'?
          <NavLink to="/receipt" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-receipt fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Receipts</span>
        </NavLink>
        :
        <NavLink to="/debt" className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-money-bill-wave-alt fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Fee Management</span>
        </NavLink>
        }
        {
          decode.type!=='student' ? null :
           <NavLink to="/progress" className="btn btn-square text-sm">
           <span className="btn-inner--icon d-block"><i className="far fa-stopwatch fa-2x"></i></span>
           <span className="btn-inner--icon d-block pt-2">Daily Progress</span>
         </NavLink>
        }
        <Link type='button' onClick={this.logOut} className="btn btn-square text-sm">
          <span className="btn-inner--icon d-block"><i className="far fa-sign-out-alt fa-2x"></i></span>
          <span className="btn-inner--icon d-block pt-2">Log Out</span>
        </Link>
      </div>
      
    </div>
        )
    }
}
