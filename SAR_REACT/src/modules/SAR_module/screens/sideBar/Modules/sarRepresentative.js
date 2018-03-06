import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import Footer from '../../../../../components/Footer';
import SideBar from '../../../../../components/SideBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import SearchInput, { createFilter } from 'react-search-input'
import { Pagination, Icon } from 'semantic-ui-react';
import PopUpLogin from '../../LoginPage/PopUpLogin';
import Action from '../../../actions';
import SarAction from '../../../actions';

import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'
import { PulseLoader } from 'react-spinners';
import Moment from 'react-moment';
import $ from "jquery";

const KEYS_TO_FILTERS = ['sar.externalUser', 'sar.representative', 'sar.sarDescription', 'sar.id', 'sar.status', 'sar.assignedTo', 'sar.creation_time']

var sarData;

class SARRepresentative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sarDetails: [],
      navBar: 'nav-md',
      currentPage: 0,
      totalPage: 0,
      pageCount: 10,
      totalPages: 0,
      searchTerm: '',
      loading: true,
      success: false,
      userName: '',
      userData: {},
      allUserDetails: [],
      filterLoader: false,
      loggedUserType: '',
      isLoggedIn: false,
      openPopUpLogin: false,
      previousUrl: ''
    }

    this.sarValue = this.sarValue.bind(this);
    this.handleObj = this.handleObj.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
    this.selectRecordCount = this.selectRecordCount.bind(this);
    this.PageCountResponse = this.PageCountResponse.bind(this);
    this.getSarResponse = this.getSarResponse.bind(this);
    this.userId = this.userId.bind(this);

    this.searchUpdated = this.searchUpdated.bind(this);
    this.getallUserResponse = this.getallUserResponse.bind(this);
    this.filter = this.filter.bind(this);
    this.getAdvanceSearch = this.getAdvanceSearch.bind(this);
    this.getAdvanceClear = this.getAdvanceClear.bind(this);
    this.getSearchSarResponse = this.getSearchSarResponse.bind(this);
    this.exuserResponse = this.exuserResponse.bind(this);

    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
    window.location.reload();
  }

  // componentWillMount() {
  //   this.setState({ loading: true })

  //  if(this.props.location.state !== undefined ){
  //    var UserId = this.props.location.state.data.data.data.user_id;
  //     this.setState({ uerId: UserId })      
  //    this.props.SarAction.getUserById(this.props.location.state.data.data.data.user_id, this.userId);   
  //   } 
  //   else{
  //   //var user = JSON.parse(localStorage.getItem("user"))
  //   //console.log("user",this.props.location.state.data.data.data.user_id)
  //   //console.log("reps data------------------->",this.state.userData)
  //    this.props.Action.getSarByRep(this.state.userData.name, this.getSarResponse); 
  //   }
  // }

  componentWillMount() {
    var userId = localStorage.getItem("userId");
    if (userId == null) {
      console.log('need to login');
      var prevUrl = this.props.location.pathname;
      console.log('prev url ', prevUrl);
      this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
    } else {
      this.setState({ isLoggedIn: true });
      var loggedUserType = localStorage.getItem("userType");
      this.setState({ loggedUserType: loggedUserType });
      console.log('uster tyepepepep --> ', loggedUserType);

      var userInfo = JSON.parse(localStorage.getItem("user"));
      this.setState({ loading: true, userName: userInfo.name })
      this.props.Action.getSarByRepName(userInfo.name, 1, 10, this.PageCountResponse);
      var usertype = 'ComplainceTeamMember'
      this.props.Action.getUserByType(usertype, this.getallUserResponse);
    }
  }



  getallUserResponse(value) {
    console.log("all team member--------------->", value)
    this.setState({ allUserDetails: value.data.data })
  }

  userId(user) {

    console.log("reps data------------------->", user.data.data)
    this.setState({ userData: user.data.data })
    this.props.Action.getSarByRep(user.data.data.name, this.getSarResponse);
  }
  sarValue(value) {
    this.setState({ sarDetails: value.data.data })
  }

  componentWillReceiveProps(nextProps) {
    var array = nextProps.getSarSuccess;
  }

  getSAR = (e, { activePage }) => this.props.Action.getSarByRepName(this.state.userName, activePage, this.state.pageCount, this.PageCountResponse);

  selectRecordCount(e) {
    this.setState({ loading: true })
    this.setState({
      pageCount: e.target.value
    })
    this.props.Action.getSarByRepName(this.state.userName, 1, e.target.value, this.PageCountResponse);
  }

  PageCountResponse(value) {
    console.log("pagecount---------------->", value.data.data.sar)
    this.setState({ loading: false, success: true, checkPages: true, filterLoader: false })
    if (value.data) {
      this.setState({
        currentPage: value.data.data.page,
        totalPage: value.data.data.pages,
        checkTotalPage: value.data.data.pages,
        sarDetails: value.data.data.sar,
        totalReponse: value.data.data.total,
        endCount: value.data.data.sar.length
      });
      if ((parseInt(this.state.pageCount) === 25 || parseInt(this.state.pageCount) === 50 || parseInt(this.state.pageCount) === 100) && (parseInt(value.data.data.page) !== 1)) {
        this.setState({ startCount: (parseInt(value.data.data.page) * 10) + 1 })
      } else if (parseInt(value.data.data.page) !== 1) {
        this.setState({ startCount: (parseInt(value.data.data.page - 1) * 10) + 1 })
      } else {
        this.setState({ startCount: 1 })
      }
      $(document).ready(function () {
        $('#representative').DataTable();
        $("#representative_info").hide();
        $("#representative_paginate").hide();
        $("#representative_length").hide();
        $("#representative_filter").hide();
      });
      // var sarData = value.data.data.sar;
      // for (var i = 0; i < sarData.length; i++) {
      //   this.props.Action.getSarbyExUserName(sarData[i].sar.externalUser, 1, 10, this.exuserResponse);
      // }
    }
  }

  exuserResponse(value) {
    if (value.data !== undefined) {
      var sarDetail = value.data.data.sar;
      for (var i = 0; i < sarDetail.length; i++) {
        this.state.sarDetails.push(sarDetail[i])
      }
      for (var j = 0; j <= this.state.sarDetails.length; j++) {
        if (this.state.sarDetails[j].sar.id === this.state.sarDetails[j + 1].sar.id) {
          this.state.sarDetails.splice(j, 1);
          this.setState({ sarDetails: this.state.sarDetails, totalReponse: this.state.sarDetails.length, endCount: this.state.sarDetails.length })
        }
      }
      this.setState({ sarDetails: this.state.sarDetails, totalReponse: value.data.data.total, endCount: this.state.sarDetails.length })
    }

  }

  getSarResponse(value) {
    this.setState({ loading: false, success: true })
    if (value.data) {
      this.setState({
        currentPage: value.data.data.page,
        totalPage: value.data.data.pages,
        sarDetails: value.data.data,
      });
    }
  }

  getAdvanceSearch(e) {
    console.log("search sar------------->", e.target.value)
    if (e.target.value !== 'Select') {
      this.setState({ advanceSearch: e.target.value })
    }
  }

  getAdvanceClear(e) {
    this.setState({ advanceSearch: 'Select' })
    this.props.Action.getSarByUserIdPage(localStorage.getItem("userId"), 1, 10, this.PageCountResponse);
  }

  filter() {
    console.log("filter sar------------->", this.state.advanceSearch)
    this.setState({ filterLoader: true, sarDetails: [] })
    if (this.state.advanceSearch == 'All') {
      this.props.Action.getSarByUserIdPage(localStorage.getItem("userId"), 1, 10, this.PageCountResponse);
    }
    else {
      this.props.Action.searchSar(this.state.advanceSearch, this.getSearchSarResponse);
    }

  }


  handleObj(obj) {
    browserHistory.push({
      pathname: '/sar/reps/SAR-details/' + obj.sar.id,
      state: { sar: obj }
    })
  }

  handleNavBar(value) {
    this.setState({ navBar: value })
  }

  getSearchTerm(e) {
    console.log("search sar------------->", e.target.value)
    this.setState({ searchTerm: e.target.value })
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  getSearchSarResponse(value) {
    console.log("SAR nlength---------------->", value.data.data.sar.length)
    console.log("SAR--page--------------->", value.data.data.page)
    this.setState({ loading: false, success: true, checkPages: true, filterLoader: false })

    if (value.data) {
      this.setState({
        currentPage: value.data.data.page,
        totalPage: value.data.data.pages,
        checkTotalPage: value.data.data.pages,
        sarDetails: value.data.data.sar,
        totalReponse: value.data.data.total,
        endCount: parseInt(value.data.data.page) * parseInt(value.data.data.sar.length)
      });
    }

  }

  render() {
    const filteredEmails = this.state.sarDetails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div>
        {this.state.isLoggedIn ?
          <div className={this.state.navBar}>
            <div class="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
              <div class="main_container">
                <SideBar handleTab={this.handleTab} />
                <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />

                <div class="right_col" role="main">
                  <div class="">
                    <div class="page-title">
                      <div class="title_left">
                        <h3>Subject Access Request</h3>
                      </div>

                      <div class="title_right">
                        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                          {/*   <div class="input-group">
                          <input type="text" class="form-control" placeholder="Search for..." />
                          <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Go!</button>
                          </span>
                     </div>*/}
                        </div>
                      </div>
                    </div>

                    <div class="clearfix"></div>

                    <div class="row">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_title">
                            <h2>Subject Access Request</h2>

                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">

                            {/*          <div class="filter-box">
                            <div class="row">

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Escalated</label>
                                  <select name="escalated" id="" onChange={this.getAdvanceSearch} class="form-control">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Priority</label>
                                  <select name="priority" id="" onChange={this.getAdvanceSearch} class="form-control">
                                    <option value="">Select</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Normal">Normal</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Status</label>
                                  <select name="status" id="" onChange={this.getAdvanceSearch} class="form-control">
                                    <option value="">Select</option>
                                    <option value="New">New</option>
                                    <option value="Open">Open</option>
                                    <option value="Active">Active</option>
                                    <option value="Closed">Closed</option>
                                    <option value="InProgress">InProgress</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Assigned To</label>
                                  <select name="assign" className="form-control" onChange={this.getAdvanceSearch} required="" >
                                    <option value="Select">Select</option>
                                    {this.state.allUserDetails.map(function (obj, index) {

                                      return (
                                        <option value={obj.id}>{obj.name}</option>

                                      )
                                    }.bind(this))}

                                    <option value="All">All</option>
                                  </select>
                                </div>
                                <div class="form-group text-right">
                                  <button class="btn btn-round btn-primary" onClick={this.getAdvanceClear}>Clear</button>
                                  <button class="btn btn-round btn-primary" onClick={this.filter}>Filter</button>
                                </div>
                              </div>

                            </div>
                                  </div>*/}


                            <p class="lead">SAR Records </p>
                            <div id="datatable_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                              <div className="row">
                                <div className="col-sm-">
                                  <div className="dataTables_length" id="datatable_length" onChange={this.selectRecordCount}>
                                    <label>Show <select name="datatable_length" className="form-control input-sm">
                                      <option value="10">10</option>
                                      <option value="25">25</option>
                                      <option value="50">50</option>
                                      <option value="100">100</option></select> entries</label>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div id="datatable_filter" className="dataTables_filter">
                                    <label style={{ marginRight: '125px' }}>Search:</label><SearchInput className="search-input" onChange={this.searchUpdated} />
                                  </div></div>
                              </div><br /><br />

                              <div className="row"><div className="col-sm-12">
                                <table id="representative" className="table table-striped table-bordered dataTable no-footer" cellSpacing="0" width="100%">
                                  <thead>
                                    <tr role="row">
                                      <th style={{ width: '100px' }}>SAR ID</th>
                                      <th style={{ width: '100px' }}>Actions</th>
                                      <th style={{ width: '100px' }}>ExternalUser Name</th>
                                      <th style={{ width: '100px' }}>Representative</th>
                                      <th style={{ width: '100px' }}>Description</th>
                                      <th style={{ width: '100px' }}>Escalated</th>
                                      <th style={{ width: '100px' }}>Priority</th>
                                      <th style={{ width: '100px' }}>Status</th>
                                      <th style={{ width: '100px' }}>Assigned To</th>
                                      <th style={{ width: '100px' }}>Creation Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredEmails.map(function (obj, index) {
                                      return (<tr key={index} >
                                        <td className="sorting_1" >{obj.sar.id}</td>
                                        <td>
                                          {this.state.loggedUserType === "Administrator" ?
                                            <a className="btn btn-default sar-action" onClick={() => this.handleObj(obj)}><em className="fa fa-eye"></em></a> :
                                            <a className="btn btn-default sar-action" onClick={() => this.handleObj(obj)}><em className="fa fa-pencil"></em></a>
                                          }
                                        </td>
                                        <td>{obj.sar.externalUser}</td>
                                        <td>{obj.sar.representative}</td>
                                        <td>{obj.sar.sarDescription}</td>
                                        <td>{obj.sar.isEscalated === true ? 'Yes' : 'No'}</td>
                                        <td>{obj.sar.priority}</td>
                                        <td class="text-center"><span class={obj.sar.status === "Open" ? "label label-success" : obj.sar.status === "InProgress" ? "label label-warning"
                                          : obj.sar.status === "Active" ? "label label-primary" :
                                            obj.sar.status === "Completed" ? "label label-success" :
                                              obj.sar.status === "ReOpened" ? "label label-info" :
                                                obj.sar.status === "Escalated" ? "label label-danger" :
                                                  obj.sar.status === "Closed" ? "label label-danger" :

                                                    ''}>{obj.sar.status}</span></td>
                                        <td>{obj.assignedTO.name}</td>
                                        <td>{obj.sar.creation_time}</td>
                                      </tr>)
                                    }.bind(this))}
                                  </tbody>

                                </table>

                              </div>
                              </div>
                              {this.state.loading === true ? <div>
                                <center>
                                  <PulseLoader
                                    color={'#F15A25'}
                                    loading={this.state.loading}
                                  />
                                </center>
                              </div> : ''}

                              {this.state.filterLoader === true ? <div>
                                <center>
                                  <PulseLoader
                                    color={'#F15A25'}
                                    loading={this.state.filterLoader}
                                  />
                                </center>
                              </div> : ''}

                              {filteredEmails.length === 0 && this.state.filterLoader === false ? <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No Response  Found </p> </div> : ''}
                              <div className="row">
                                <div className="col-sm-5">
                                  <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {this.state.startCount} to {this.state.endCount} of {this.state.totalReponse} entries</div></div>
                                <div className="col-sm-7">
                                  <div className="pull-right">
                                    <Pagination
                                      activePage={this.state.currentPage}
                                      onPageChange={this.getSAR}
                                      totalPages={this.state.totalPage}
                                      ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                      firstItem={{ content: <Icon name='angle double left' />, icon: true, className: this.state.currentPage == 1 ? " disabledtable" : '' }}
                                      lastItem={{ content: <Icon name='angle double right' />, icon: true, className: this.state.currentPage === this.state.totalPage ? " disabledtable" : '' }}
                                      prevItem={{ content: <Icon name='angle left' />, icon: true, className: this.state.currentPage === 1 ? "disabledtable" : '' }}
                                      nextItem={{ content: <Icon name='angle right' />, icon: true, className: this.state.currentPage === this.state.totalPage ? " disabledtable" : '' }}
                                      boundaryRange={0} />
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
            <Footer />
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
function mapStateToProps(state, ownProps) {
  console.log("state0,", state)

  return {
    getSarSuccess: state.sar.getSarDetails
  };
}
function mapDispatchToProps(dispatch) {
  return {
    Action: bindActionCreators(Action, dispatch),
    SarAction: bindActionCreators(SarAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARRepresentative);






