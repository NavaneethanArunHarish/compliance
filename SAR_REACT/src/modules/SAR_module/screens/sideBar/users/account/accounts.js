import React, { Component } from 'react';
import PopUpLogin from '../../../LoginPage/PopUpLogin';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'

import UserList from './userList';
import CreateUser from './createUser';
import UploadUser from './uploadUser';
import UploadUserPicture from './uploadUserPicture';
import CreateLDAP from './createLdap'

class accountsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserTab: true,
      newUserTab: false,
      ldapTab: false,
      uploadUserTab: false,
      uploadUserPicureTab: false,
      editData: {},
      navBar: 'nav-md',
      isLoggedIn: false,
      openPopUpLogin: false,
      previousUrl: '',
      addData: ''

    }
    this.handlePage = this.handlePage.bind(this);
    this.handleNewUserTab = this.handleNewUserTab.bind(this);
    this.handleLdapTab = this.handleLdapTab.bind(this);
    this.handleUploadUser = this.handleUploadUser.bind(this);
    this.handleUploadUserPicture = this.handleUploadUserPicture.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
    window.location.reload();
  }

  componentWillMount() {
    var userId = localStorage.getItem("userId");
    if (userId == null) {
      console.log('need to login');
      var prevUrl = this.props.location.pathname;
      console.log('prev url ', prevUrl);
      this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
    } else {
      this.setState({ isLoggedIn: true });
    }
  }

  handlePage() {

    this.setState({
      listUserTab: true,
      newUserTab: false,
      ldapTab: false,
      uploadUserTab: false,
      uploadUserPicureTab: false,
      editData: {},
      addData:''
    });
  }
  handleNewUserTab() {

    this.setState({
      newUserTab: true,
      listUserTab: false,
      ldapTab: false,
      uploadUserTab: false,
      uploadUserPicureTab: false,
      addData:''

    });

    if (Object.keys(this.state.editData).length !== 0) {
      this.setState({ editData: {}, addData: 'addUser' });
    }

  }
  handleLdapTab() {
    this.setState({
      listUserTab: false,
      newUserTab: false,
      ldapTab: true,
      uploadUserTab: false,
      uploadUserPicureTab: false,
      editData: {},
      addData:''
    });
  }

  handleNavBar(value) {
    this.setState({ navBar: value })
  }
  handleUploadUser() {
    this.setState({
      listUserTab: false,
      newUserTab: false,
      ldapTab: false,
      uploadUserTab: true,
      uploadUserPicureTab: false,
      editData: {},
      addData:''
    });
  }
  handleUploadUserPicture() {
    this.setState({
      listUserTab: false,
      newUserTab: false,
      ldapTab: false,
      uploadUserTab: false,
      uploadUserPicureTab: true,
      editData: {},
      addData:''
    });
  }

  handleTab() {
    this.handlePage();
  }

  handleEdit(data) {
    this.setState({ editData: data })
    this.handleNewUserTab();
  }



  render() {
    return (
      <div>
        {this.state.isLoggedIn ?
          <div className={this.state.navBar}>
            <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
              <div className="main_container">
                <SideBar handleTab={this.handleTab} />
                <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                <div className="right_col" role="main">
                  <div className="row">
                    <div>
                      <div className="page-title">
                        <div className="title_left">
                          <h3>Users</h3>
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
                              <h2>Users Accounts</h2>

                              <div className="clearfix"></div>
                            </div>
                            <div className="x_content">

                              <div className="x_content">

                                <div className="col-xs-2">
                                  <ul className="nav nav-tabs tabs-left">
                                    <li className="active" ><a data-toggle="tab" onClick={this.handlePage}>Browse list of users</a>
                                    </li>

                                    <li><a data-toggle="tab" onClick={this.handleNewUserTab}>Add a new user</a>
                                    </li>
                                    <li  ><a data-toggle="tab" onClick={this.handleLdapTab}>Add LDAP/AD SERVER</a>
                                    </li>
                                    {/* <li><a href="#user-default-preferences" data-toggle="tab">User default preferences</a>
                        </li> */}
                                    {/* <li><a href="#user-profile-fields" data-toggle="tab">User profile fields</a>
                        </li> */}
                                    {/* <li><a href="#cohorts" data-toggle="tab">Cohorts</a>
                        </li> */}
                                    <li  ><a data-toggle="tab" onClick={this.handleUploadUser}>Upload users</a>
                                    </li>
                                    <li ><a data-toggle="tab" onClick={this.handleUploadUserPicture}>Upload user pictures</a>
                                    </li>
                                  </ul>
                                </div>


                                {/* <UserList />:  */}

                                {this.state.listUserTab === true ?
                                  <UserList handleEdit={this.handleEdit} /> : ''
                                }
                                {this.state.newUserTab === true && this.state.addData === '' ?
                                  <CreateUser handleTab={this.handleTab} editData={this.state.editData} /> : ''
                                }

                                {this.state.addData === 'addUser' ?
                                  <CreateUser handleTab={this.handleTab} editData={this.state.editData} /> : ''
                                }

                                {this.state.uploadUserTab === true ?
                                  <UploadUser /> : ''
                                }
                                {this.state.uploadUserPicureTab === true ?
                                  <UploadUserPicture /> : ''
                                }
                                {this.state.ldapTab === true ?
                                  <CreateLDAP /> : ''
                                }


                                {/* <div className="col-xs-10">
                      <div className="tab-content">
                       
                        
                         </div> */}



                              </div>
                            </div>
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

export default accountsComponent;
