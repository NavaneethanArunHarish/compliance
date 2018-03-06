import React, { Component } from 'react';
import PopUpLogin from '../../../LoginPage/PopUpLogin';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'
import AdminModule from './adminModule';
import AdminSite from './adminSite';
import ComplainceTeamMember from './complainceTeamMember';
import ComplainceTeamLead from './complainceTeamLead';
import UserDPO from './dpo';
import CheckSysPermission from './checkSystemPermission';

class permissionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminsite: true,
      moduleAdmin: false,
      cTeamLead: false,
      cTeamMember: false,
      dpo: false,
      sysPermission: false,
      navBar: 'nav-md',
      isLoggedIn:false,
      openPopUpLogin:false,
      previousUrl:''

    }
    this.handleAdminSite = this.handleAdminSite.bind(this);
    this.handleModuleAdmin = this.handleModuleAdmin.bind(this);
    this.handleComplainceTeamLead = this.handleComplainceTeamLead.bind(this);
    this.handleComplainceTeamMember = this.handleComplainceTeamMember.bind(this);
    this.handleDPO = this.handleDPO.bind(this);
    this.handleCheckSysPermission = this.handleCheckSysPermission.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
    };

    componentWillMount() {
      var userId = localStorage.getItem("userId");
      if(userId == null) {
        console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ',prevUrl);
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }else{
       this.setState({isLoggedIn:true });
      }
    }

  handleAdminSite() {
    this.setState({
      adminsite: true,
      moduleAdmin: false,
      cTeamLead: false,
      cTeamMember: false,
      dpo: false,
      sysPermission: false
    })
  }
  handleModuleAdmin() {
    this.setState({
      adminsite: false,
      moduleAdmin: true,
      cTeamLead: false,
      cTeamMember: false,
      dpo: false,
      sysPermission: false
    })
  }
  handleComplainceTeamLead() {
    this.setState({
      adminsite: false,
      moduleAdmin: false,
      cTeamLead: true,
      cTeamMember: false,
      dpo: false,
      sysPermission: false
    })
  }
  handleComplainceTeamMember() {
    this.setState({
      adminsite: false,
      moduleAdmin: false,
      cTeamLead: false,
      cTeamMember: true,
      dpo: false,
      sysPermission: false
    })
  }
  handleDPO() {
    this.setState({
      adminsite: false,
      moduleAdmin: false,
      cTeamLead: false,
      cTeamMember: false,
      dpo: true,
      sysPermission: false
    })
  }
  handleCheckSysPermission() {
    this.setState({
      adminsite: false,
      moduleAdmin: false,
      cTeamLead: false,
      cTeamMember: false,
      dpo: false,
      sysPermission: true
    })
  }

  handleNavBar(value) {
    this.setState({ navBar: value })
  }




  render() {
    return (
      <div>
      {this.state.isLoggedIn ? 
        <div className={this.state.navBar}>
          <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
            <div className="main_container">
              <SideBar handleTab={this.handleTab} />
              <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar}/>
              <div className="right_col" role="main">
                <div className="">
                  <div className="page-title">
                    <div className="title_left">
                      <h3>Permissions</h3>
                    </div>

                    <div className="title_right">
                      <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Search for..." />
                          <span className="input-group-btn">
                            <button className="btn btn-default" type="button">Go!</button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="x_panel">
                        <div className="x_title">
                          <h2>Permissions</h2>

                          <div className="clearfix"></div>
                        </div>
                        <div className="x_content">

                          <div className="col-xs-2">

                            <ul className="nav nav-tabs tabs-right">

                              <li className="active"><a data-toggle="tab" onClick={this.handleAdminSite}>Site administrators</a>
                              </li>
                              <li><a data-toggle="tab" onClick={this.handleModuleAdmin}>Module Administrators</a>
                              </li>
                              <li><a data-toggle="tab" onClick={this.handleComplainceTeamLead}>Compliance Team Lead</a>
                              </li>
                              <li><a data-toggle="tab" onClick={this.handleComplainceTeamMember}>Compliance Team Member</a>
                              </li>
                              <li><a data-toggle="tab" onClick={this.handleDPO}>Data Protection Officer (DPO)</a>
                              </li>
                              <li><a data-toggle="tab" onClick={this.handleCheckSysPermission}>Check System Permissions</a>
                              </li>

                            </ul>

                            

                          </div>
                       
                        {
                              this.state.adminsite === true ? <AdminSite /> : ""
                            }
                            {
                              this.state.moduleAdmin === true ? <AdminModule /> : ""
                            }
                            {
                              this.state.sysPermission === true ? <CheckSysPermission /> : ""
                            }
                            {
                              this.state.cTeamLead === true ? <ComplainceTeamLead /> : ""
                            }
                            {
                              this.state.cTeamMember === true ? <ComplainceTeamMember /> : ""
                            }
                             {
                              this.state.dpo === true ? <UserDPO /> : ""
                            }
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         :
        <div>
            <PopUpLogin prvUrl={this.state.previousUrl} redirectAferSuccess={this.reloadPage} />
                </div>
       }
      </div>

    );
  }
}

export default permissionComponent;
