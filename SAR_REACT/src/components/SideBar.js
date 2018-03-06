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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Switch from 'react-switchery';
import '../assests/css/custom.css'
import '../assests/css/custom.min.css'
import LoginAction from '../modules/SAR_module/actions'
import Action from '../modules/SAR_module/actions';

import { BaseUrl } from '../serviceUrl/serviceUrl';

var userType, userId;

const userTypeArray = ["Administrator", "ComplainceTeamLeader", "ComplainceTeamMember"]

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DashboardTab: { active: false },
      SiteAdministrationTab: { active: false },
      ModulesTab: { active: false },
      UsersTab: { active: false },
      CoursesTab: { active: false },
      GradesTab: { active: false },
      PluginsTab: { active: false },
      AppearanceTab: { active: false },
      ServerTab: { active: false },
      ReportsTab: { active: false },
      DevelopmentTab: { active: false },
      Payment: { active: false },
      dashboardEnable: '',
      siteAdminEnable: '',
      moduleEnable: '',
      sarenable: '',
      dpiaenable: '',
      userEnable: '',
      courseEnable: '',
      user_type: '',
      userDetails: '',
      paymetEnable: '',
      SARTab: { active: false },
      DPIATab: { active: false },
      email: '',
      password: ''
    }
    this.handleMethod = this.handleMethod.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutResponse = this.logoutResponse.bind(this);
    this.userResponse = this.userResponse.bind(this);
    this.PaymentMethod = this.PaymentMethod.bind(this);
    this.sarTeamLeader = this.sarTeamLeader.bind(this);
  }

  handleClick(TabName, value) {

    var currentTab = this.state;


    switch (TabName) {
      case "DashboardTab":
        console.log("insids of dash")
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        browserHistory.push("/sar/" + value + "/SAR-dashboard")
        break;
      case "SiteAdministrationTab":
        console.log("insids of SiteAdministrationTab")
        if (this.state.siteAdminEnable === '') {
          currentTab.SiteAdministrationTab.active = true;
          this.setState({ siteAdminEnable: 'SiteAdministrationTab' })
        } else {
          this.setState({ siteAdminEnable: '' })
          currentTab.SiteAdministrationTab.active = false;
        }
        currentTab.DashboardTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "ModulesTab":
        if (this.state.moduleEnable === '') {
          currentTab.ModulesTab.active = true;
          this.setState({ moduleEnable: 'ModulesTab' })
        } else {
          this.setState({ moduleEnable: '' })
          currentTab.ModulesTab.active = false;
        }
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "UsersTab":
        if (this.state.userEnable === '') {
          currentTab.UsersTab.active = true;
          this.setState({ userEnable: 'UsersTab' })
        } else {
          this.setState({ userEnable: '' })
          currentTab.UsersTab.active = false;
        }
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "CoursesTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = true;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "GradesTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = true;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "PluginsTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = true;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "AppearanceTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = true;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "ServerTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = true;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        break;
      case "ReportsTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = true;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        break;
      case "DevelopmentTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = true;
        currentTab.Payment.active = false;
        break;
      case "PaymentTab":
        if (this.state.paymetEnable === '') {
          currentTab.Payment.active = true;
          this.setState({ paymetEnable: 'PaymentTab' })
        } else {
          this.setState({ paymetEnable: '' })
          currentTab.Payment.active = false;
        }
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.ModulesTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.UsersTab.active = false;
        break;
      case "SARTab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        if (this.state.sarenable === '') {
          currentTab.SARTab.active = true;
          this.setState({ sarenable: 'SARTab' })
        } else {
          this.setState({ sarenable: '' })
          currentTab.SARTab.active = false;
        }
        break;
      case "DPIATab":
        currentTab.DashboardTab.active = false;
        currentTab.SiteAdministrationTab.active = false;
        currentTab.UsersTab.active = false;
        currentTab.CoursesTab.active = false;
        currentTab.GradesTab.active = false;
        currentTab.PluginsTab.active = false;
        currentTab.AppearanceTab.active = false;
        currentTab.ServerTab.active = false;
        currentTab.ReportsTab.active = false;
        currentTab.DevelopmentTab.active = false;
        currentTab.Payment.active = false;
        currentTab.SARTab.active = false;
        if (this.state.dpiaenable === '') {
          currentTab.DPIATab.active = true;
          this.setState({ dpiaenable: 'DPIATab' })
        } else {
          this.setState({ dpiaenable: '' })
          currentTab.DPIATab.active = false;
        }
        break;

      case "DPIAMenuD":
        browserHistory.push("/dpia/" + value + "/dashboard")
        break;

      case "SARC":
        browserHistory.push("/sar/" + value + "/SAR-create")
        break;

      case "SARA":
        browserHistory.push("/sar/" + value + "/SAR-assign")
        break;

      case "DashboardAdmin":
        browserHistory.push("/sar/" + value + "/dashboard")
        break;

      case "DPIAMenuP":
        browserHistory.push("/dpia/Projects")
        break;
      case "DPIAMenuAP":
        browserHistory.push("/dpia/addProject")
        break;
      case "DPIAMenuA":
        browserHistory.push("/dpia/assessment")
        break;
      case "DPIAMenuAA":
        browserHistory.push("/dpia/addAssessment")
        break;
      case "DPIAMenuQB":
        browserHistory.push("/dpia/question")
        break;

    }


    console.log("curernsa", currentTab)
    this.setState({ currentTab });
  }

  handleMethod(data) {
    if (data == "Accounts") {
      browserHistory.push('/sar/admin/user-accounts')
    }
    if (data === 'Departments') {
      browserHistory.push('/sar/admin/user-departments')
    }
    if (data === 'Permissions') {
      browserHistory.push('/sar/admin/user-permission')
    }
    //this.props.handleTab(data);
  }

  PaymentMethod(data) {
    if (data === 'Payment') {
      browserHistory.push('/sar/licences')
    }

  }

  sarTeamLeader() {
    browserHistory.push('/sar/leader/SAR-assign');
  }


  componentWillMount() {
    userType = localStorage.getItem("userType");
    userId = localStorage.getItem("userId");
    var user = localStorage.getItem("user");
    var userObjConv = JSON.parse(user)
    this.setState({
      userDetails: userObjConv
    })
    this.setState({ email: this.props.email })
    this.setState({ password: this.props.password })
    console.log("username------------lms--->", this.props.email)
  }

  userResponse(response) {
    var user = response.data.data;
    localStorage.setItem("userName", user.name);
    this.setState({
      userDetails: user,
    })

    //localStorage.setItem("user", user);
  }


  logout() {
    this.props.LoginAction.logout(userId, this.logoutResponse);
  }

  logoutResponse(value) {
    browserHistory.push('/');
  }

  render() {
    return (

      <div className="col-md-3 left_col">
        <div className="left_col scroll-view">
          <div className="navbar nav_title" style={{ border: 0, paddingLeft: '0px' }}>
            <a onClick={(e) => this.handleClick("DashboardAdmin", "admin")} className="site_title"><img src={logo} style={{ height: '62px' }} alt="" /></a>
          </div>
          <div className="clearfix"></div><br />
          <div className="profile clearfix">
            <div className="profile_pic">
              <img src={welcomeImg} alt="..." className="img-circle profile_img" />
            </div>
            <div className="profile_info">
              <span>Welcome,</span>
              <h2>{this.state.userDetails.name}</h2>
            </div>
          </div>
          <br />
          <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
              {userType === "Administrator" ? <h3>SITE ADMINISTRATION</h3> : ''}
              {userType === "ComplainceTeamLeader" ? <h3>COMPLIANCE TEAM LEAD</h3> : ''}
              {userType === "ComplainceTeamMember" ? <h3>COMPLIANCE TEAM MEMBER</h3> : ''}
              {userType === "External User" ? <h3>EXTERNAL USER</h3> : ''}
              {userType === "Representative" ? <h3>REPRESENTATIVE</h3> : ''}
              <ul className="nav side-menu">
                {userType === "Administrator" ? <li className={this.state.DashboardTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("DashboardTab", "admin")} ><i className="fa fa-home"></i>Dashboard</a></li> : ''}
                {userType === "ComplainceTeamLeader" ? <li className={this.state.DashboardTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("DashboardTab", "leader")} ><i className="fa fa-home"></i>Dashboard</a></li> : ''}
                {userType === "ComplainceTeamMember" ? <li className={this.state.DashboardTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("DashboardTab", "member")} ><i className="fa fa-home"></i>Dashboard</a></li> : ''}
                {userType === "External User" ? <li className={this.state.DashboardTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("DashboardTab", "Exuser")} ><i className="fa fa-home"></i>Dashboard</a></li> : ''}
                {userType === "Representative" ? <li className={this.state.DashboardTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("DashboardTab", "reps")} ><i className="fa fa-home"></i>Dashboard</a></li> : ''}
                {/*  <li className={this.state.SiteAdministrationTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("SiteAdministrationTab")} ><i className="fa fa-table"></i> Site administration <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.SiteAdministrationTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="#" onClick={(e) => this.handleMethod("Analytics")}>Analytics</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Competencies")}>Competencies</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Badges")}>Badges</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Location")}>Location</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Language")}>Language</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Security")}>Security</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Front page")}>Front page</a></li>
                    <li><a href="#" onClick={(e) => this.handleMethod("Mobile app")}>Mobile app</a></li>
                  </ul>
              </li>*/}

                <li className={this.state.ModulesTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("ModulesTab")}><i className="fa fa-puzzle-piece"></i> Modules <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.ModulesTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>

                    {userType === "Administrator" ? <li className={this.state.SARTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("SARTab")}> Subject Access Request <span className="fa fa-chevron-down"></span></a>
                      <ul className={this.state.SARTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>

                        {userType === "Administrator" ? <li><a onClick={(e) => this.handleClick("DashboardTab", "admin")}>SAR Dashboard</a></li> : ''}
                        {/* {userType === "Administrator" ? <li><a href="#">SAR Assignment</a></li> : ''} */}
                      </ul></li> : ''}
                    {userType === "ComplainceTeamLeader" ? <li className={this.state.SARTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("SARTab")}> Subject Access Request <span className="fa fa-chevron-down"></span></a>
                      <ul className={this.state.SARTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>

                        {userType === "ComplainceTeamLeader" ? <li><a onClick={(e) => this.handleClick("DashboardTab", "leader")}>SAR Dashboard</a></li> : ''}
                        {userType === "ComplainceTeamLeader" ? <li><a onClick={(e) => this.handleClick("SARA", "leader")}>SAR Assignment</a></li> : ''}
                      </ul></li> : ''}
                    {userType === "ComplainceTeamMember" ? <li className={this.state.SARTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("SARTab")}> Subject Access Request <span className="fa fa-chevron-down"></span></a>
                      <ul className={this.state.SARTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>

                        {userType === "ComplainceTeamMember" ? <li><a onClick={(e) => this.handleClick("DashboardTab", "member")}>SAR Dashboard</a></li> : ''}
                        {/* {userType === "ComplainceTeamMember" ? <li><a href="#">SAR Assignment</a></li> : ''} */}
                      </ul></li> : ''}

                    {userType === "External User" ? <li className={this.state.SARTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("SARC", "Exuser")}> Create SAR</a>
                    </li> : ''}

                    {userTypeArray.indexOf(userType) > -1 && userType !== 'External User' ? <li className={this.state.DPIATab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("DPIATab")}> DPIA PIA <span className="fa fa-chevron-down"></span></a>
                      <ul className={this.state.DPIATab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                        {userTypeArray.indexOf(userType) > -1 ? <li><a onClick={(e) => this.handleClick("DPIAMenuD", userType)}>Dashboard</a></li> : ''}
                        {userTypeArray.indexOf(userType) > -1 ? <li><a onClick={(e) => this.handleClick("DPIAMenuP", "ccc")}>Projects</a></li> : ''}
                        {userTypeArray.indexOf(userType) > -1 ? <li><a onClick={(e) => this.handleClick("DPIAMenuAP", "ccc")}>Add New Project</a></li> : ''}
                        {userTypeArray.indexOf(userType) > -1 ? <li><a onClick={(e) => this.handleClick("DPIAMenuA", "ccc")}>Assessment</a></li> : ''}
                        {userTypeArray.indexOf(userType) > -1 ? <li><a onClick={(e) => this.handleClick("DPIAMenuAA", "ccc")}>Add New Assessment</a></li> : ''}
                        {userTypeArray.indexOf(userType) > -1 ? <li><a onClick={(e) => this.handleClick("DPIAMenuQB", "ccc")}>Question Bank</a></li> : ''}
                      </ul></li> : ''}


                    {/* {userType === "Administrator" ? <li><a>CC Module Marketplace</a></li> : ''} */}
                    {userType === "Administrator" || userType === "ComplainceTeamLeader" || userType ==="ComplainceTeamMember" ?
                      <li><a style={{ paddingTop: '1px', paddingLeft: '1px' }}>
                        <form action={BaseUrl.LMSUrl} method="post" name="form" id="form">
                          <p><input type="text" name="username" value={this.state.email} hidden /></p>
                          <p><input type="password" name="password" value={this.state.password} hidden /></p>
                          <input style={{ background: 'none', border: 'none' }}
                            type="submit" name="Submit" value="Learning Management System" />
                        </form></a></li>



                      : ''}
                    {/* {userType === "External User" ? <li><a href={"/SAR-ExternalUser"}>External User</a></li> : ''}

                    {userType === "Representative" ? <li><a href={"/SAR-ExUserRepresentative"}>External User Representative</a></li> : ''}
            {userType === "Representative" ? <li><a href={"/SAR-DetailsRepresentative"}>Representative Details</a></li> : ''} */}

                    {/* {userType === "ComplainceTeamLeader" ? <li><a onClick={this.sarTeamLeader}>Subject Access Request</a></li> : ''} */}

                  </ul>
                </li>
                {userType === "Administrator" ? <li className={this.state.UsersTab.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("UsersTab")} ><i className="fa fa-user"></i> Users <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.UsersTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a onClick={(e) => this.handleMethod("Accounts")}>Accounts</a></li>
                    <li><a onClick={(e) => this.handleMethod("Departments")}>Departments</a></li>
                    <li><a onClick={(e) => this.handleMethod("Permissions")}>Permissions</a></li>
                  </ul>
                </li> : ''}

                {/* <li className={this.state.CoursesTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("CoursesTab")} ><i className="fa fa-book"></i> Courses <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.CoursesTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="courses.html">Courses</a></li>
                    <li><a href="backups.html">Backups</a></li>
                  </ul>
                </li>

                <li className={this.state.GradesTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("GradesTab")} ><i className="fa fa-star"></i> Grades <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.GradesTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="grades.html">Grades</a></li>
                    <li><a href="report-settings.html">Report settings</a></li>
                  </ul>
                </li>

                <li className={this.state.PluginsTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("PluginsTab")} ><i className="fa fa-plug"></i> Plugins <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.PluginsTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="plugins.html">Plugins</a></li>
                    <li><a href="activity-modules.html">Activity modules</a></li>
                    <li><a href="admin-tools.html">Admin tools</a></li>
                    <li><a href="antivirus-plugins.html">Antivirus plugins</a></li>
                    <li><a href="authentication.html">Authentication</a></li>
                    <li><a href="availability-restrictions.html">Availability restrictions</a></li>
                    <li><a href="blocks.html">Blocks</a></li>
                    <li><a href="caching.html">Caching</a></li>
                    <li><a href="course-formats.html">Course formats</a></li>
                    <li><a href="data-formats.html">Data formats</a></li>
                    <li><a href="document-converters.html">Document converters</a></li>
                    <li><a href="enrolments.html">Enrolments</a></li>
                    <li><a href="filters.html">Filters</a></li>
                    <li><a href="licences.html">Licences</a></li>
                    <li><a href="local-plugins.html">Local plugins</a></li>
                    <li><a href="logging.html">Logging</a></li>
                    <li><a href="media-players.html">Media players</a></li>
                    <li><a href="message-outputs.html">Message outputs</a></li>
                    <li><a href="question-behaviours.html">Question behaviours</a></li>
                    <li><a href="question-types.html">Question types</a></li>
                    <li><a href="plugin-reports.html">Reports</a></li>
                    <li><a href="repositories.html">Repositories</a></li>
                    <li><a href="search.html">Search</a></li>
                    <li><a href="text-editors.html">Text editors</a></li>
                    <li><a href="web-services.html">Web services</a></li>
                  </ul>
                </li>
                <li className={this.state.AppearanceTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("AppearanceTab")} ><i className="fa fa-laptop"></i> Appearance <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.AppearanceTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="appearance.html">Appearance</a></li>
                    <li><a href="themes.html">Themes</a></li>
                  </ul>
                </li>
                <li className={this.state.ServerTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("ServerTab")} ><i className="fa fa-server"></i> Server <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.ServerTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="server.html">Server</a></li>
                    <li><a href="email.html">Email</a></li>
                  </ul>
    </li> */}
                {/* <li className={this.state.ReportsTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("ReportsTab")} ><i className="fa fa-bar-chart"></i> Reports</a>
                </li> */}
                {/* {userType === "Administrator" ? <li className={this.state.Payment.active == true ? "active" : ""} ><a onClick={(e) => this.handleClick("PaymentTab")}><i className="fa fa-windows"></i> Licence <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.Payment.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    {userType === "Administrator" ? <li><a onClick={(e) => this.PaymentMethod("Payment")}>Licence Selection</a></li> : ''}
                  </ul>
                </li> : ''} */}
                {/*   <li className={this.state.DevelopmentTab.active == true ? "active" : ""}><a onClick={(e) => this.handleClick("DevelopmentTab")} ><i className="fa fa-windows"></i> Development <span className="fa fa-chevron-down"></span></a>
                  <ul className={this.state.DevelopmentTab.active == true ? "nav child_menu side-bar-display" : "nav child_menu"}>
                    <li><a href="development.html">Development</a></li>
                    <li><a href="experimental.html">Experimental</a></li>
                  </ul>
                </li>*/}
              </ul>
            </div>
          </div>
          <div className="sidebar-footer hidden-small">
            {/* <a data-toggle="tooltip" data-placement="top" title="Settings">
              <span className="fa fa-cog" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
              <span className="fa fa-expand" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Lock">
              <span className="fa fa-eye-slash" aria-hidden="true"></span>
              </a>*/}
            <a onClick={this.logout}>
              <span className="fa fa-power-off" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>


    );
  }
}


function mapStateToProps(state, props) {
  return {
    logoutSuccess: state.login.logoutSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LoginAction: bindActionCreators(LoginAction, dispatch),
    Action: bindActionCreators(Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

