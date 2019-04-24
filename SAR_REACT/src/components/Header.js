import React, { Component } from 'react';
import logo from '../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import welcomeImg from '../assests/images/img.jpg';
import Img1 from '../assests/images/DPIAPIAManagementR13.jpg';
import Img2 from '../assests/images/DPIAPIAManagementR15.jpg';
import Img3 from '../assests/images/DPIAPIAManagementR16.jpg';
import Img4 from '../assests/images/DPIAPIAManagementR14.jpg';
import Img5 from '../assests/images/DPIAPIAManagementR11.jpg';
import Img6 from '../assests/images/DPIAPIAManagementR12.jpg';
import Img7 from '../assests/images/DPIAPIAManagementR17.jpg';
import { connect } from 'react-redux'; gfgfgfgfgfgfgfgfg
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Switch from 'react-switchery';
import '../assests/css/custom.css';

import '../assests/css/custom.min.css';
import Action from '../modules/SAR_module/actions';

var userType, userId;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutResponse = this.logoutResponse.bind(this);
    this.userResponse = this.userResponse.bind(this);
  }

  handleClick(value) {
    this.props.handleNavBar(value);
  }


  componentWillMount() {
    userType = localStorage.getItem("userType");
    userId = localStorage.getItem("userId");
    var user = localStorage.getItem("user");
    var userObjConv = JSON.parse(user)
    this.setState({
      userDetails: userObjConv
    })
    //this.props.Action.getUserById(userId, this.userResponse);
  }

  userResponse(response) {
    var user = response.data.data;
    localStorage.setItem("user", user);
    this.setState({
      userDetails: user,
    })
  }


  logout() {
    this.props.Action.logout(userId, this.logoutResponse);
  }

  logoutResponse(value) {
    browserHistory.push('/');
    localStorage.clear();
  }

  render() {
    console.log('bef render - -> ', this.state.userDetails);
    return (

      <div>
        <div className="top_nav">
          <div className="nav_menu">
            <nav>
              <div className="nav toggle">
                {this.props.navBarValue === "nav-sm" ? <a id="menu_toggle" onClick={(e) => this.handleClick("nav-md")}><i className="fa fa-bars"></i></a>
                  : <a id="menu_toggle" onClick={(e) => this.handleClick("nav-sm")}><i className="fa fa-bars"></i></a>}
              </div>


              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src={welcomeImg} alt="" />{this.state.userDetails.name}
                    <span className=" fa fa-angle-down"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="javascript:;"> Profile</a></li>
                    {/* <li>
                      <a href="javascript:;">
                        <span className="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                      </a>
                    </li> */}
                    <li><a href="javascript:;">Help</a></li>
                    <li><a href="javascript:;" onClick={this.logout}><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>

                {/*      <li role="presentation" className="dropdown">
                  <a href="javascript:;" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-envelope-o"></i>
                    <span className="badge bg-green">6</span>
                  </a>
                  <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                    <li>
                      <a>
                        <span className="image"><img src={welcomeImg} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="image"><img src={welcomeImg} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="image"><img src={welcomeImg} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="image"><img src={welcomeImg} alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span className="time">3 mins ago</span>
                        </span>
                        <span className="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                      </a>
                    </li>
                    <li>
                      <div className="text-center">
                        <a>
                          <strong>See All Alerts</strong>
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>*/}
              </ul>

            </nav>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    getUserSuccess: state.login.getUserSuccess
  };
}
function mapDispatchToProps(dispatch) {
  return {
    Action: bindActionCreators(Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

