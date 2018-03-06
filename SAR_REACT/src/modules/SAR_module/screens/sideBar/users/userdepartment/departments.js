import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'

import DepartmentList from './departmentList';
import CreateDepartment from './createDepartment';

class departmentsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDeptTab: true,
      newDeptTab: false,
      navBar: 'nav-md'
    }
    this.handlePage = this.handlePage.bind(this);
    this.handleNewDeptTab = this.handleNewDeptTab.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }

  componentWillMount() {
    // var userId = localStorage.getItem("userId");
    // if (userId == null) {
    //   console.log('need to login');
    //   var prevUrl = this.props.location.pathname;
    //   console.log('prev url ', prevUrl);
    //   this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
    // } else {
    //   this.setState({ isLoggedIn: true });
    // }
  }

  handlePage() {
    this.setState({
      listDeptTab: true,
      newDeptTab: false
    });
  }

  handleNewDeptTab() {
    this.setState({
      newDeptTab: true,
      listDeptTab: false,
    });
  }

  handleNavBar(value) {
    this.setState({ navBar: value })
  }
  
  handleTab() {
    this.handlePage();
  }




  render() {
    return (
      <div>
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
                          <h3>Departments</h3>
                        </div>

                        {/* <div className="title_right">
                          <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                            <div className="input-group">
                              <input type="text" className="form-control" placeholder="Search for..." />
                              <span className="input-group-btn">
                                <button className="btn btn-default" type="button">Go!</button>
                              </span>
                            </div>
                          </div>
                        </div> */}
                      </div>

                      <div className="clearfix"></div>

                      <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="x_panel">
                            <div className="x_title">
                              <h2>Departments</h2>

                              <div className="clearfix"></div>
                            </div>
                            <div className="x_content">

                              <div className="x_content">

                                <div className="col-xs-2">
                                  <ul className="nav nav-tabs tabs-left">
                                    <li className="active" ><a data-toggle="tab" onClick={this.handlePage}>Browse list of Departments</a>
                                    </li>

                                    <li><a data-toggle="tab" onClick={this.handleNewDeptTab}>Add a new Department</a>
                                    </li>
                
                                  </ul>
                                </div>


                                {/* <UserList />:  */}

                                {this.state.listDeptTab === true ?
                                  <DepartmentList /> : ''
                                }
                                {this.state.newDeptTab === true  ?
                                  <CreateDepartment handleTab={this.handleTab}/> : ''
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
      </div>
    );
  }
}

export default departmentsComponent;
