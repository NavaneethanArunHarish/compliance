import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Login from '../modules/SAR_module/screens/LoginPage/Login';
import RegisterOne from '../modules/SAR_module/screens/RegisterPage/RegisterOne';
import RegisterTwo from '../modules/SAR_module/screens/RegisterPage/RegisterTwo';
import Dashboard from '../modules/SAR_module/screens/Dashboard/dashboard';
import SARDashboard from '../modules/SAR_module/screens/SARDashboard/SARdashboard';
import resetPassword from '../modules/SAR_module/screens/LoginPage/resetPassword';
import forgetPassword from '../modules/SAR_module/screens/LoginPage/forgetPassword';
import LandingPage from '../modules/SAR_module/screens/LandingPage/LandingPage';
// SAR
import SubjectAccessRequestComponent from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequest';
import SubjectAccessRequestDetailsComponent from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestDetails';
import SubjectAccessRequestTicketsComponent from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestTickets';
import SubjectAccessRequesOverviewComponent from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestOverview';
import SubjectAccessRequestCreateComponent from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestCreate';
import SubjectAccessRequestDpoComponent from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestDpo';
import SubjectAccessRequestDetailsExUser from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestDetailsExUser';
import SARRepresentative from '../modules/SAR_module/screens/sideBar/Modules/sarRepresentative';
import SARDetailsRepresentative from '../modules/SAR_module/screens/sideBar/Modules/sarDetailsRepresentative';
import SARExternalUser from '../modules/SAR_module/screens/sideBar/Modules/sarExternalUser';
import SubjectAccessRequestDetailExUser from '../modules/SAR_module/screens/sideBar/Modules/subjectAccessRequestDetailsExUser';
import sarCCTeamLeader from '../modules/SAR_module/screens/sideBar/Modules/sarCCTeamLead/sarCCTeamLeader';
import sarCCTeamLeaderDetails from '../modules/SAR_module/screens/sideBar/Modules/sarCCTeamLead/sarCCTeamLeaderDetails';
import sarCCTeamMember from '../modules/SAR_module/screens/sideBar/Modules/sarCCTeamMember';
import sarCCTeamMemberDetails from '../modules/SAR_module/screens/sideBar/Modules/sarCCTeamMemberDetails';
import SARDetails from '../modules/SAR_module/screens/sideBar/Modules/SarDetails';
import sarCCTeamLeaderAssign from '../modules/SAR_module/screens/sideBar/Modules/sarCCTeamLead/sarCCTeamMemberAssignTo';
import SARAssign from '../modules/SAR_module/screens/sideBar/Modules/sarCCTeamLead/sarAssign';
// LICENCE
import LicenceModuleComponent from '../modules/SAR_module/screens/sideBar/Licence/LicenceModule';
import LicencePurchaseComponent from '../modules/SAR_module/screens/sideBar/Licence/LicencePurchase';
import LicencePurchaseRenewComponent from '../modules/SAR_module/screens/sideBar/Licence/LicencePurchaseRenew';
import LicenceSelectionComponent from '../modules/SAR_module/screens/sideBar/Licence/LicenceSelection';
//User Management
import accountsComponent from '../modules/SAR_module/screens/sideBar/users/account/accounts';
import UserPermission from '../modules/SAR_module/screens/sideBar/users/userpermission/permission';
import UserDepartment from '../modules/SAR_module/screens/sideBar/users/userdepartment/departments';

//DPO 
import DpoDashboard from '../modules/SAR_module/screens/sideBar/Modules/DPO/dpoDashboard';

//Email verification 
import EmailVerification from '../modules/SAR_module/screens/EmailVerification/emailVerified'
import license from '../modules/SAR_module/screens/sideBar/Licence/Licence';

// SAR-Cratetion
import SARCreate from '../modules/SAR_module/screens/sideBar/Modules/sarCreate';


//Payment

import Payment from '../modules/SAR_module/screens/Payment/payment';


// DPIA Modules- files

import Projects from '../modules/DPIA_module/screens/projects/projects';
import AddProject from '../modules/DPIA_module/screens/projects/addprojects';
import EditProject from '../modules/DPIA_module/screens/projects/editprojects';
import Assessment from '../modules/DPIA_module/screens/assessment/assessments';
import AddAssessment from '../modules/DPIA_module/screens/assessment/addassessment';
import EditAssessment from '../modules/DPIA_module/screens/assessment/editassessment';
import AssignAssessment from '../modules/DPIA_module/screens/assessment/assignassessment';
import Question from '../modules/DPIA_module/screens/question/question';
import AddQuestion from '../modules/DPIA_module/screens/question/addquestion';
import EditQuestion from '../modules/DPIA_module/screens/question/editquestion';

import DpiaCTMDashboard from '../modules/DPIA_module/screens/dashboard/dpia-ctm-dashboard';
import DpiaCTLDashboard from '../modules/DPIA_module/screens/dashboard/dpia-ctl-dashboard';
import DpiaExUserDashboard from '../modules/DPIA_module/screens/dashboard/dpia-exuser-dashboard';
import DPIAAnswerSheet from '../modules/DPIA_module/screens/dpia/dpia';
import DelegatedQues from '../modules/DPIA_module/screens/dpia/delegatedquestion';
import DPIACLAnswerSheet from '../modules/DPIA_module/screens/dpia/dpiacl';
import DPIAListQuestion from '../modules/DPIA_module/screens/dpia/answerDpia';
import DPIACLListQuestion from '../modules/DPIA_module/screens/dpia/answerDpiaCl';

export default class PageRoute extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path='/register' component={RegisterOne} />

        <Route path='/email-verified' component={EmailVerification} />
        {/*  <Route path='/register2' component={RegisterTwo} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/SARdashboard' component={SARDashboard} /> 
       <Route path="/SAR-Create" component={SubjectAccessRequestCreateComponent} />
      */}

        <Route path="/forgot/new/:token" component={resetPassword} />
        <Route path="/forgetPassword" component={forgetPassword} />
        <Route path='/LandingPage' component={LandingPage}/>

        <Route path='/sar/admin/dashboard' component={DpoDashboard} />
        <Route path="/sar/admin/SAR-dashboard" component={SubjectAccessRequestComponent} />
        <Route path="/sar/admin/SAR-details/:id" component={SARDetails} />
        <Route path='/sar/admin/user-accounts' component={accountsComponent} />
        <Route path='/sar/admin/user-permission' component={UserPermission} />
        <Route path='/sar/admin/user-departments' component={UserDepartment} />
        {/* <Route path='/sar/admin/license-payment' component={Payment} /> */}

        <Route path="/sar/leader/SAR-dashboard" component={sarCCTeamLeader} />
        <Route path="/sar/leader/SAR-details/:id" component={sarCCTeamLeaderDetails} />
        <Route path='/sar/leader/SAR-assignTo/:id' component={sarCCTeamLeaderAssign} />
        <Route path='/sar/leader/SAR-assign' component={SARAssign} />

        <Route path="/sar/member/SAR-dashboard" component={sarCCTeamMember} />
        <Route path="/sar/member/SAR-details/:id" component={sarCCTeamMemberDetails} />

        <Route path="/sar/Exuser/SAR-dashboard" component={SARExternalUser} />
        <Route path="/sar/Exuser/SAR-details/:id" component={SubjectAccessRequestDetailExUser} />

        <Route path="/sar/reps/SAR-dashboard" component={SARRepresentative} />
        <Route path="/sar/reps/SAR-details/:id" component={SARDetailsRepresentative} />

        <Route path="/sar/SAR-Dpo" component={SubjectAccessRequestDpoComponent} />
        {/* <Route path="/sar/licences" component={license} /> */}

        <Route path="/sar/Exuser/SAR-create" component={SARCreate} />


        {/* <Route path='/dashboard' component={SARDashboard} />
      <Route path="/forgot/new/:token" component={resetPassword} />
      <Route path="/forgetPassword" component={forgetPassword} />
      <Route path="/SAR" component={SubjectAccessRequestComponent} />
     
      <Route path="/SAR-Details" component={SARDetails} />
      <Route path="/SAR-Tickets" component={SubjectAccessRequestTicketsComponent} />
      <Route path="/SAR-Overview" component={SubjectAccessRequesOverviewComponent} />
      <Route path="/SAR-ExUser" component={SubjectAccessRequestDetailsExUser} />
      <Route path="/sar/SAR-Dpo" component={SubjectAccessRequestDpoComponent} />
      <Route path="/SAR-ExUserRepresentative" component={SubjectAccessRequestExUserRepresentative} />
      <Route path="/SAR-DetailsRepresentative" component={SARDetailsRepresentative} />
      <Route path="/SAR-ExternalUser" component={SARExternalUser} />
      <Route path="/SAR-DetailsExUser" component={SubjectAccessRequestDetailExUser} />
      <Route path="/SAR-CCTeamLeader" component={sarCCTeamLeader} />
      <Route path="/SAR-CCTeamLeaderDetails" component={sarCCTeamLeaderDetails} />
      <Route path="/SAR-CCTeamMember" component={sarCCTeamMember} />
      <Route path="/SAR-CCTeamMemberDetails" component={sarCCTeamMemberDetails} />
      <Route path ='/user-accounts' component={accountsComponent} />
      <Route path='SAR-Payment' component={Payment}/>
      <Route path ='/user-permission' component={UserPermission} />
      <Route path ='/SAR-CCTeamLeaderAssignTo' component={sarCCTeamLeaderAssign} />
      <Route path ='/SAR-CCTeamLeaderAssign' component={SARAssign} />
    <Route path ='/sar/SAR-Dpodashboard' component={DpoDashboard} /> */}
 

        {/*    <Route path='/Licence-Module' component={LicenceModuleComponent} />
      <Route path='/Licence-Purchase' component={LicencePurchaseComponent} />
      <Route path='/Licence-Purchase-Renew' component={LicencePurchaseRenewComponent} />
    <Route path='/Licence-Selection' component={LicenceSelectionComponent} />  */}


        {/* Routes for DPIA */}

        <Route path="/dpia/Projects" component={Projects} />
        <Route path="/dpia/addProject" component={AddProject} /> 
        <Route path="/dpia/editProject" component={EditProject} />
        <Route path="/dpia/assignAssessment" component={AssignAssessment} />
        <Route path="/dpia/assessment" component={Assessment} />
        <Route path="/dpia/addAssessment" component={AddAssessment} />
        <Route path="/dpia/editAssessment" component={EditAssessment} />
        <Route path="/dpia/question" component={Question} />
        <Route path="/dpia/addQuestion" component={AddQuestion} />
        <Route path="/dpia/editQuestion" component={EditQuestion} />
        <Route path="/dpia/ComplainceTeamMember/dashboard" component={DpiaCTMDashboard} />
        <Route path="/dpia/ComplainceTeamLeader/dashboard" component={DpiaCTLDashboard} />
        <Route path="/dpia/Administrator/dashboard" component={DpiaCTLDashboard} />
        {/* <Route path="/dpia/External%20User/dashboard" component={DpiaExUserDashboard} /> */}
        <Route path="/dpia/answerQuestions" component={DPIAAnswerSheet} />
        <Route path="/dpia/delegatedQuestions" component={DelegatedQues} />
        <Route path="/dpia/checkAnswer" component={DPIACLAnswerSheet} />
        <Route path="/dpia/checkquestion" component={DPIAListQuestion} />
        <Route path="/dpia/clcheckquestion" component={DPIACLListQuestion} /> 
      </Router>

    )
  }
}