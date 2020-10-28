import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';
class TopNav extends Component {
  logOut=e=>{
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = '/'
  }
  render() {
    const decode = jwt_decode(localStorage.token)
    return (
      <nav class="navbar navbar-main navbar-expand-lg navbar-dark navbar-border" id="navbar-main" style={{backgroundColor:decode.color==='no color' ? '#6e30ff' : decode.color}}>
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main-collapse" aria-controls="navbar-main-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-user d-lg-none ml-auto">
            <ul class="navbar-nav flex-row align-items-center">
              <li class="nav-item">
                <a href="#" class="nav-link nav-link-icon sidenav-toggler active" data-action="sidenav-pin" data-target="#sidenav-main"><i class="far fa-bars"></i></a>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse navbar-collapse-fade" id="navbar-main-collapse">
            <ul class="navbar-nav align-items-lg-center">
             
              <li class="border-top opacity-2 my-2"></li>
              <li class="nav-item">
                <Link to='/profile' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-home-alt"></i> Home
                </Link>
              </li>
              {
        decode.type==='student' ?
        <li class="nav-item">
                <Link to='/result' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-list-alt"></i> Results
                </Link>
              </li>
        :
        <li class="nav-item">
                <Link to='/students' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-user-graduate"></i> Students
                </Link>
              </li>
      }
{ decode.type==='owner' ?
              <li class="nav-item">
                <Link to='/teachers' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-user-tie"></i> Teachers
                </Link>
              </li>
              : null
}
              <li class="nav-item">
                <Link to='/news' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-newspaper"></i> News
                </Link>
              </li>
{ decode.type==='owner' ?
              <li class="nav-item">
                <Link to='/bills' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-money-bill"></i> Bills
                </Link>
              </li>
              : null
}              
              <li class="nav-item">
                <Link to='/ptf' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-comment-alt-dots"></i> PTF
                </Link>
              </li>
             
              {
          decode.type==='student'?
          <li class="nav-item">
                <Link to='/receipt' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-receipt"></i> Receipts
                </Link>
              </li>
        :
        <li class="nav-item">
                <Link to='/debt' class="nav-link nav-link-icon">
                  <i className="far fa-sm fa-money-bill-wave-alt"></i> Fee Management
                </Link>
              </li>
        }
                {
          decode.type!=='student' ? null :
          <li class="nav-item">
          <Link to='/progress' class="nav-link nav-link-icon">
            <i className="far fa-sm fa-stopwatch"></i> Daily Progress
          </Link>
        </li>
           
        }
              <li class="nav-item">
                <Link class="nav-link nav-link-icon" onClick={this.logOut}>
                  <i className="far fa-sm fa-sign-out-alt"></i> Log Out
                </Link>
              </li>
              <li class="border-top opacity-2 my-2"></li>
            </ul>
            <ul class="navbar-nav ml-lg-auto align-items-center d-none d-lg-flex">
              <li class="nav-item">
                <a href="#" class="nav-link nav-link-icon sidenav-toggler active" data-action="sidenav-pin" data-target="#sidenav-main"><i class="far fa-bars"></i></a>
              </li>
              <li class="nav-item dropdown dropdown-animate">
                <a class="nav-link pr-lg-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div class="media media-pill align-items-center">
                    <span class="avatar">
                    {
            decode.image==='no image' ? 
            <span className=" avatar  bg-primary rounded-circle shadow hover-shadow-lg">
                <span className='text-white'>
                    {(decode.type!=='owner' ? decode.surname : decode.lastName).slice(0,1)}{(decode.type!=='owner' ? decode.name : decode.firstName).slice(0,1)}
                    </span>
            </span>
            :
        <img alt="" src={decode.image} class=" avatar rounded-circle shadow hover-shadow-lg"/>
        }
                    </span>
                    <div class="ml-2 d-none d-lg-block">
                      <span class="mb-0 text-sm  font-weight-bold">{(decode.type!=='owner' ? decode.surname : decode.lastName)+' '+(decode.type!=='owner' ? decode.name : decode.firstName)}</span>
                    </div>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right dropdown-menu-arrow">
                  <h6 class="dropdown-header px-0">Hi, {decode.type!=='owner' ? decode.name : decode.firstName}!</h6>

                  <Link to='/profile' class="dropdown-item">
                    <i class="far fa-user-ninja"></i>
                    <span>My profile</span>
                  </Link>

                  <div class="dropdown-divider"></div>
                  <Link onClick={this.logOut} class="dropdown-item">
                    <i class="far fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default TopNav;
