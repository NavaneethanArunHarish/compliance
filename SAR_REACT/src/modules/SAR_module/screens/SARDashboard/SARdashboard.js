import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import welcomeImg from '../../../../assests/images/img.jpg';
import Img1 from '../../../../assests/images/DPIAPIAManagementR13.jpg';
import Img2 from '../../../../assests/images/DPIAPIAManagementR15.jpg';
import Img3 from '../../../../assests/images/DPIAPIAManagementR16.jpg';
import Img4 from '../../../../assests/images/DPIAPIAManagementR14.jpg';
import Img5 from '../../../../assests/images/DPIAPIAManagementR11.jpg';
import Img6 from '../../../../assests/images/DPIAPIAManagementR12.jpg';
import Img7 from '../../../../assests/images/DPIAPIAManagementR17.jpg';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Switch from 'react-switchery';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import DashboardComponent from '../sideBar/dashboard';
//site administratiom
import AnalyticsComponent from '../sideBar/siteAdministration/analytics';
import CompetenciesComponent from '../sideBar/siteAdministration/competencies';
import BadgesComponent from '../sideBar/siteAdministration/badges';
import LocationComponent from '../sideBar/siteAdministration/location';
import LanguageComponent from '../sideBar/siteAdministration/language';
import SecurityComponent from '../sideBar/siteAdministration/security';
import FrontPageComponent from '../sideBar/siteAdministration/frontPage';
import MobileAppComponent from '../sideBar/siteAdministration/mobileApp';
import AccountsComponent from '../sideBar/users/account/accounts';
//subject access request
import SubjectAccessRequestComponent from '../sideBar/Modules/subjectAccessRequest';

//import CourseComponent from '../sideBar/course/course';

class SARDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginResponse: '',
      currentView: 'Dashboard',
      navBar: 'nav-md'
    }
    this.handleTab = this.handleTab.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
  }





  componentWillMount() {
    console.log("props data--------------->", this.props);
   // this.setState({email:this.props.location.state.email})
  }

  handleTab(data) {
    console.log("dashboard>>>>>>>>>", data);
    this.setState({ currentView: data })
 }

 handleNavBar(value) {
  this.setState({ navBar: value })
}



  render() {
    return (
      <div>
        <div className={this.state.navBar}>
          <div class="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
            <div class="main_container">
              <SideBar handleTab={this.handleTab} />
              <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar}/>
              <div class="right_col" role="main">
                <div class="row">
                  {this.state.currentView === 'Dashboard' ? <DashboardComponent /> : ''}
                  {this.state.currentView === 'Analytics' ? <AnalyticsComponent /> : ''}
                  {this.state.currentView === 'Competencies' ? <CompetenciesComponent /> : ''}
                  {this.state.currentView === 'Badges' ? <BadgesComponent /> : ''}
                  {this.state.currentView === 'Location' ? <LocationComponent /> : ''}
                  {this.state.currentView === 'Language' ? <LanguageComponent /> : ''}
                  {this.state.currentView === 'Security' ? <SecurityComponent /> : ''}
                  {this.state.currentView === 'Front page' ? <FrontPageComponent /> : ''}
                  {this.state.currentView === 'Mobile app' ? <MobileAppComponent /> : ''}
                  {this.state.currentView === 'Accounts' ? <AccountsComponent /> : ''}
                  {/* <CourseComponent /> */}
                  {this.state.currentView === 'Subject Access Request' ? <SubjectAccessRequestComponent /> : ''}

                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}






export default SARDashboard;
