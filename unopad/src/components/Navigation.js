import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { logoutUserAction } from '../store/account/actions/userActions'


function Navigation(props) {
  const { user } = props

  const handleLogout = () => {
      props.dispatch(logoutUserAction())
  }
  return (

    <React.Fragment>
    
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png"/>
        <link rel="stylesheet" href="../assets/css/bootstrap-5.0.0-alpha-1.min.css"/>
        <link rel="stylesheet" href="../assets/css/LineIcons.2.0.css"/>
        <link rel="stylesheet" href="../assets/css/animate.css"/>
        <link rel="stylesheet" href="../assets/css/main.css"/>
        <link rel="stylesheet" href="../assets/css/navbar.css"/>

        <div class="preloader d-none">
                <div class="loader">
                    <div class="ytp-spinner">
                        <div class="ytp-spinner-container">
                            <div class="ytp-spinner-rotator">
                                <div class="ytp-spinner-left">
                                    <div class="ytp-spinner-circle"></div>
                                </div>
                                <div class="ytp-spinner-right">
                                    <div class="ytp-spinner-circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
          
        <header class="header navbar-area navbar-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <nav class="navbar navbar-expand-lg">
                            <a class="navbar-brand" href="/Home">
                                <img src="assets/img/logo.svg" alt="Logo"/>
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" class="navbar-nav ml-auto">
                                    <li class="nav-item">
                                        <a class="page-scroll active" href="/Home">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/Home#about">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/Home#service">Service</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/Home#roadmap">Roadmap</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/Home#team">Team</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/Contract">Contract</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/NewContract">NewContract</a>
                                    </li>
                                    {user && 
                                     <li class="nav-item">
                                     <a class="page-scroll" onClick={handleLogout}> Logout</a>
                                 </li>
                                   }
                                    {!user && (
                                        <>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/login">Login</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="page-scroll" href="/signup">SignUp</a>
                                    </li>
                                    </>
                                    )}
                                </ul>
                            </div> 
                        </nav>
                    </div>
                </div>
            </div>       
        </header>
       
    </React.Fragment>
    
  )
 
}
const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(Navigation);
