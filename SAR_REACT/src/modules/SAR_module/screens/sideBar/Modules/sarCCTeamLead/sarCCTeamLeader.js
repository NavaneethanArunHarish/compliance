import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Action from '../../../../actions';
import { Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../LoginPage/PopUpLogin';
import '../../../../../../assests/css/custom.css' 
 
import '../../../../../../assests/css/custom.min.css' 
import 'react-jquery-datatables/css/datatables.min.css'
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-bs/js/dataTables.bootstrap';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import SearchInput, { createFilter } from 'react-search-input'
import { PulseLoader } from 'react-spinners';
import UserAction from '../../../../actions';
import SarAction from '../../../../actions';

var sarData;

const KEYS_TO_FILTERS = ['sar.externalUser', 'sar.representative', 'sar.sarDescription', 'sar.id', 'sar.status', 'sar.assignedTo', 'sar.creation_time']

class SARCCTeamLeader extends Component {
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
      allUserDetails: [],
      advanceSearch: 'Select',
      totalReponse: '',
      endCount: '',
      startCount: 1,
      filterLoader: false,

      AdvStatus:'',
      AdvPriority:'',
      AdvAssignedTo:0,
      AdvIsEscalated:'',
      isLoggedIn:false,
      openPopUpLogin:false,
      previousUrl:''

    }

    this.sarValue = this.sarValue.bind(this);
    this.handleObj = this.handleObj.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
    this.selectRecordCount = this.selectRecordCount.bind(this);
    this.PageCountResponse = this.PageCountResponse.bind(this);
    this.getSarResponse = this.getSarResponse.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);


    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.getallUserResponse = this.getallUserResponse.bind(this);

    this.getSearchSarResponse = this.getSearchSarResponse.bind(this);
    this.filter = this.filter.bind(this);
    //this.getAdvanceSearch = this.getAdvanceSearch.bind(this);
    this.getAdvanceClear = this.getAdvanceClear.bind(this)
    this.getAdvStatus = this.getAdvStatus.bind(this)
    this.getAdvPriority = this.getAdvPriority.bind(this)
    this.getAdvAssignedTo = this.getAdvAssignedTo.bind(this)
    this.getAdvIsEscalated = this.getAdvIsEscalated.bind(this)

   this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
    }

  getAdvStatus(e) {
    console.log("search sar------------->", e.target.value)
    if (e.target.value !== 'Select') {
        this.setState({ AdvStatus: e.target.value })
    }
}


getAdvPriority(e) {
    console.log("search sar------------->", e.target.value)
    if (e.target.value !== 'Select') {
        this.setState({ AdvPriority: e.target.value })
    }
}

getAdvAssignedTo(e) {
    console.log("search sar------------->", e.target.value)
    if (e.target.value !== 'Select') {
        this.setState({ AdvAssignedTo: e.target.value })
    }
}

getAdvIsEscalated(e) {
    console.log("search sar------------->", e.target.value)
    if (e.target.value !== 'Select') {
        this.setState({ AdvIsEscalated: e.target.value })
    }
}


getAdvanceClear(e) {

  this.setState({ 
      AdvStatus: '', 
      AdvPriority: '',
      AdvAssignedTo: 0,
      AdvIsEscalated:''
  
  })

  this.props.Action.getSarByPageId(1, this.getSarResponse);

}

filter() {
        
  this.setState({ filterLoader: true, sarDetails: [] })
  if (this.state.advanceSearch == 'All') {
      this.props.SarAction.getPageCount(1, 10, this.PageCountResponse);
  }
  else {
   var obj={
      "status":this.state.AdvStatus,
      "priority":this.state.AdvPriority,
      "assignedTo":this.state.AdvAssignedTo,
      "isEscalated":this.state.AdvIsEscalated
   } 

   console.log("filter sar-------------------------------------------->", obj)

   this.props.Action.searchSar(obj, this.getSearchSarResponse);
  }

}



  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  sarValue(value) {
    this.setState({ sarDetails: value.data.data })
  }

  componentWillReceiveProps(nextProps) {
    var array = nextProps.getSarSuccess;

  }


  componentWillMount() {
      var userId = localStorage.getItem("userId");
      if(userId == null) {
        console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ',prevUrl);
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }else{
       this.setState({isLoggedIn:true });
       this.setState({ loading: true })
    this.props.Action.getSarByPageId(1, this.getSarResponse);

    var usertype = 'ComplainceTeamMember'
    this.props.UserAction.getUserByType(usertype, this.getallUserResponse);
      }
    }

  selectRecordCount(e) {
    this.setState({ loading: true })
    this.setState({
      pageCount: e.target.value
    })
    this.props.Action.getPageCount(1, e.target.value, this.PageCountResponse);
  }

  PageCountResponse(value) {
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
    }
  }



  getSarResponse(value) {
    this.setState({ loading: false, success: true })
    var sarResponse = value.data.data.sar;
    this.state.sarDetails = [];
    for (var i = 0; i < sarResponse.length; i++) {
      if (sarResponse[i].sar.status !== "Closed") {
        this.state.sarDetails.push(sarResponse[i]);
      }
    }
    if (value.data) {
      this.setState({
        currentPage: value.data.data.page,
        totalPage: value.data.data.pages,
        sarDetails: this.state.sarDetails,
        totalReponse: value.data.data.total,
        endCount: parseInt(value.data.data.page) * parseInt(value.data.data.sar.length)
      });
      $(document).ready(function () {
        $('#leader').DataTable();
        $("#leader_info").hide();
        $("#leader_paginate").hide();
        $("#leader_length").hide();
        $("#leader_filter").hide();
      });
    }
  }

  getallUserResponse(value) {
    console.log("all team member--------------->", value)
    this.setState({ allUserDetails: value.data.data })
  }

  getSearchTerm(e) {
    console.log("search sar------------->", e.target.value)
    this.setState({ searchTerm: e.target.value })
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
        totalReponse: value.data.data.sar.length,
        endCount: parseInt(value.data.data.page) * parseInt(value.data.data.sar.length)
      });
    }

  }





  // getSAR = (e, { activePage }) => this.props.SarAction.getSarByPageId(activePage, this.getSarResponse);
  getSAR = (e, { activePage }) => this.props.Action.getPageCount(activePage, this.state.pageCount, this.PageCountResponse);

  handleObj(obj) {
    browserHistory.push({
      pathname: '/sar/leader/SAR-details/' + obj.sar.id,
      state: { sar: obj }
    })
  }

  handleNavBar(value) {
    this.setState({ navBar: value })
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

                    {/* <div class="title_right">
                      <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Search for..." />
                          <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Go!</button>
                          </span>
                        </div>
                      </div>
                    </div> */}
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

                          <div class="filter-box">
                            <div class="row">

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Escalated</label>
                                  <select name="escalated" id="" value={this.state.AdvIsEscalated} onChange={this.getAdvIsEscalated} class="form-control">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Priority</label>
                                  <select name="priority" id="" value={this.state.AdvPriority} onChange={this.getAdvPriority} class="form-control">
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
                                  <select name="status" id="" value={this.state.AdvStatus} onChange={this.getAdvStatus} class="form-control">
                                    <option value="">Select</option>
                                    <option value="New">New</option>
                                    <option value="Open">Open</option>
                                    <option value="Active">Active</option>
                                    <option value="Closed">Closed</option>
                                    <option value="InProgress">InProgress</option>
                                    <option value="ReOpened">ReOpened</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <label htmlFor="first">Assigned To</label>
                                  <select name="assign" className="form-control" value={this.state.AdvAssignedTo} onChange={this.getAdvAssignedTo} required="" >
                                    <option value="0">Select</option>
                                    {this.state.allUserDetails.map(function (obj, index) {

                                      return (
                                        <option value={obj.id}>{obj.name}</option>

                                      )
                                    }.bind(this))}

                                    
                                  </select>
                                </div>
                                <div class="form-group text-right">
                                  <button class="btn btn-round btn-primary" onClick={this.getAdvanceClear}>Clear</button>
                                  <button class="btn btn-round btn-primary" onClick={this.filter}>Search</button>
                                </div>
                              </div>

                            </div>
                          </div>


                          <p class="lead">SAR Records </p>
                          {/* <table id="datatable" class="table table-striped table-bordered" width="100%" cellspacing="0">
                            <thead>
                              <tr>
                                <th>SAR ID</th>
                                <th>Actions</th>
                                <th>External User Name</th>
                                <th>Representative</th>
                                <th>Description</th>
                                <th>Escalated</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Creation Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.sarDetails.map(function (obj, index) {
                                return (<tr>
                                  <td><a onClick={() => this.handleObj(obj)}>{obj.id}</a></td>
                                  <td class="text-center"> <a class="btn btn-default sar-action" href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View" ><em class="fa fa-eye"></em></a> <a class="btn btn-default sar-action" href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Reassign"><em class="fa fa-tasks"></em></a>
                                  </td>
                                  <td>{obj.externalUser}</td>
                                  <td>{obj.representative}</td>
                                  <td>{obj.sarDescription}</td>
                                  <td>{obj.isEscalated === true ? 'Yes' : 'No'}</td>
                                  <td>{obj.priority}</td>
                                  <td class="text-center"><span class={obj.status === "Open" ? "label label-success" : obj.status === "InProgress" ? "label label-warning"
                                    : obj.status === "Active" ? "label label-primary" :
                                      obj.status === "Completed" ? "label label-info" :
                                        obj.status === "ReOpened" ? "label" :
                                          obj.status === "Escalated" ? "label label-danger" :
                                            ''}>{obj.status}</span></td>
                                  <td>{obj.assignedTo}</td>
                                  <td>{obj.creation_time}</td>
                                </tr>)
                              }.bind(this))}

                            </tbody>
                          </table> */}
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
                                  {/* <label>Search:<input type="search" className="form-control input-sm" placeholder="" /></label> */}
                                  <label style={{ marginRight: '125px' }}>Search:</label><SearchInput className="search-input" onChange={this.searchUpdated} />
                                </div></div>
                            </div><br /><br />
                            <div className="row"><div className="col-sm-12">

                              <table id="leader" className="table table-striped table-bordered dataTable no-footer" cellSpacing="0" width="100%">
                                <thead>
                                  <tr role="row">
                                    <th>SAR ID</th>
                                    <th>Actions</th>
                                    <th>ExternalUser Name</th>
                                    <th>Representative</th>
                                    <th>Description</th>
                                    <th>Escalated</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Creation Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredEmails.length > 0 && filteredEmails.map(function (obj, index) {
                                    if(obj.sar.status !== "Closed") {
                                      return (<tr key={index}>
                                        <td><a>{obj.sar.id}</a></td>
                                        <td class="text-center" style={{ minWidth: '100px' }}> <a class="btn btn-default sar-action" href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View" ><em class="fa fa-pencil" onClick={() => this.handleObj(obj)}></em></a> 
                                        {/* <a class="btn btn-default sar-action" href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Reassign"><em class="fa fa-tasks"></em></a> */}
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

                                    }
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
    SarAction: bindActionCreators(SarAction, dispatch),
    UserAction: bindActionCreators(UserAction, dispatch),
    Action: bindActionCreators(Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARCCTeamLeader);






