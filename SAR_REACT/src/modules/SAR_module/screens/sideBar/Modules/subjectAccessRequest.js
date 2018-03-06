import React, { Component } from 'react';
import PopUpLogin from '../../LoginPage/PopUpLogin';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import Footer from '../../../../../components/Footer';
import { Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../../../../assests/css/custom.css' 
 
import '../../../../../assests/css/custom.min.css' 
// import '../../js/dataTables.bootstrap.css'
// import '../../js/dataTables.bootstrap.min.css'
import SarAction from '../../../actions';
import SearchInput, { createFilter } from 'react-search-input'
import { PulseLoader } from 'react-spinners';
import UserAction from '../../../../SAR_module/actions'; 
import Action from '../../../../SAR_module/actions'; 
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-bs/js/dataTables.bootstrap';
import 'datatables.net-bs/css/dataTables.bootstrap.css';


const KEYS_TO_FILTERS = ['sar.externalUser', 'sar.representative', 'sar.sarDescription', 'sar.id', 'sar.status', 'sar.assignedTo', 'sar.creation_time']

class SubjectAccessRequestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sarDetails: [],
            totalPages: 0,
            routing: false,
            navBar: 'nav-md',
            currentPage: 0,
            totalPage: 0,
            pageCount: 10,
            totalReponse: '',
            endCount: '',
            loading: true,
            success: false,
            allUserDetails: [],
            searchTerm: '',
            checkTotalPage: 0,
            checkPages: false,
            //advanceSearch: 'Select',
            startCount: 1,
            filterLoader: false,
             loggedUserType:'',
            AdvStatus:'',
            AdvPriority:'',
            AdvAssignedTo:0,
            AdvIsEscalated:'',
            isLoggedIn:false,
            openPopUpLogin:false,
            previousUrl:''

        }
        this.getSarResponse = this.getSarResponse.bind(this);
        this.passId = this.passId.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
        this.selectRecordCount = this.selectRecordCount.bind(this);
        this.PageCountResponse = this.PageCountResponse.bind(this);
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

    componentWillMount() {
         var userId = localStorage.getItem("userId");
        if(userId !== null) {
        this.setState({isLoggedIn:true });
        var loggedUserType = localStorage.getItem("userType");
        this.setState({loggedUserType : loggedUserType});
        this.setState({ loading: true })
        this.props.SarAction.getPageCount(1, 10, this.PageCountResponse);
        var usertype = 'ComplainceTeamMember'
        this.props.UserAction.getUserByType(usertype, this.getallUserResponse);
      }else {
            console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ',prevUrl);
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }

    }

    /*getAdvanceSearch(e) {
        console.log("search sar------------->", e.target.value)
        if (e.target.value !== 'Select') {
            this.setState({ advanceSearch: e.target.value })
        }
    }*/

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
       
        //this.componentWillMount();

        this.setState({ 
            AdvStatus: '', 
            AdvPriority: '',
            AdvAssignedTo: 0,
            AdvIsEscalated:''
        
        })

        this.props.SarAction.getPageCount(1, 10, this.PageCountResponse);
        this.componentWillMount;

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


    selectRecordCount(e) {
        this.setState({ loading: true })
        this.setState({
            pageCount: e.target.value
        })
        this.props.SarAction.getPageCount(1, e.target.value, this.PageCountResponse);
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
                $('#example').DataTable();
                $("#example_info").hide();
                $("#example_paginate").hide();
                $("#example_length").hide();
                $("#example_filter").hide();
            });
        }
    }
    getSarResponse(value) {
        if (value.data) {
            this.setState({
                currentPage: value.data.data.page,
                totalPage: value.data.data.pages,
                checkTotalPage: value.data.data.pages,
                sarDetails: value.data.data.sar,
            });
            // $('#example').DataTable();
            // $("#example").ajax.reload();
            // $("#example_info").hide();
            // $("#example_paginate").hide();
            // $("#example_length").hide();
            // $("#example_filter").hide();
        }
    }


    getallUserResponse(value) {
        console.log("all team member--------------->", value)
        this.setState({ allUserDetails: value.data.data })
        // $('#example').DataTable();
        // $("#example").ajax.reload();
        // $("#example_info").hide();
        // $("#example_paginate").hide();
        // $("#example_length").hide();
        // $("#example_filter").hide();
    }

    getSearchTerm(e) {
        console.log("search sar------------->", e.target.value)
        this.setState({ searchTerm: e.target.value })
    }



    getSearchSarResponse(value) {
        console.log("SAR---------------->", value.data.data)
        console.log("SAR--data---------------->", value.data)
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
            $(document).ready(function () {
                $('#example').DataTable();
                $("#example_info").hide();
                $("#example_paginate").hide();
                $("#example_length").hide();
                $("#example_filter").hide();
            });
        }

    }





    // getSAR = (e, { activePage }) => this.props.SarAction.getSarByPageId(activePage, this.getSarResponse);
    getSAR = (e, { activePage }) => this.props.SarAction.getPageCount(activePage, this.state.pageCount, this.PageCountResponse);


    passId(value) {


        browserHistory.push({
            pathname: '/sar/admin/SAR-details/' + value.sar.id,
            state: { sar: value }
        })

    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        console.log("this.state.totalpage", this.state.totalPage)
        console.log("this.state.currentPage", this.state.currentPage)
        console.log("this.state.sarDetails", this.state.sarDetails)

        const filteredEmails = this.state.sarDetails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        console.log("filteredEmails------------------------>", filteredEmails)
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
                                                <h3>Subject Access Request</h3>
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
                                            </div>*/}
                                        </div>

                                        <div className="clearfix"></div>


                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <div className="x_panel">
                                                    <div className="x_title">
                                                        <h2>Subject Access Request</h2>

                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <div className="x_content">

                                                        <div className="filter-box">
                                                            <div className="row">

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label >Escalated</label>
                                                                        <select name="escalated" id="" value={this.state.AdvIsEscalated}  onChange={this.getAdvIsEscalated} className="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="Yes">Yes</option>
                                                                            <option value="No">No</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label >Priority</label>
                                                                        <select name="priority" id="" value={this.state.AdvPriority} onChange={this.getAdvPriority} className="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="High">High</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Normal">Normal</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label >Status</label>
                                                                        <select name="status" id="" value={this.state.AdvStatus} onChange={this.getAdvStatus} className="form-control">
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

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label >Assigned To</label>
                                                                        <select name="assign" className="form-control" value={this.state.AdvAssignedTo}  onChange={this.getAdvAssignedTo} required="" >
                                                                            <option value="0">Select</option>

                                                                            {this.state.allUserDetails.map(function (obj, index) {

                                                                                return (
                                                                                    <option value={obj.id}>{obj.name}</option>

                                                                                )
                                                                            }.bind(this))}
                                                                           
                                                                        </select>


                                                                    </div>
                                                                    <div className="form-group text-right">
                                                                        <button className="btn btn-round btn-primary" onClick={this.getAdvanceClear}>Clear</button>
                                                                        <button className="btn btn-round btn-primary" onClick={this.filter}>Search</button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>


                                                        <p className="lead">SAR Records </p>


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
                                                                <table id="example" className="table table-striped table-bordered dataTable no-footer" cellSpacing="0" width="100%">
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
                                                                            return (<tr key={index} onClick={() => this.passId(obj)}  >
                                                                                <td className="sorting_1" >{obj.sar.id}</td>
                                                                                <td> 
                                                                                {this.state.loggedUserType === "Administrator" ? 
                                            <a className="btn btn-default sar-action"><em className="fa fa-eye"></em></a> : 
                                            <a className="btn btn-default sar-action"><em className="fa fa-pencil"></em></a>
                                        }
                                                                                </td>
                                                                                <td>{obj.sar.externalUser}</td>
                                                                                <td>{obj.sar.representative}</td>
                                                                                <td>{obj.sar.sarDescription}</td>
                                                                                <td>{obj.sar.isEscalated === true ? 'Yes' : 'No'}</td>
                                                                                <td>{obj.sar.priority}</td>
                                                                                <td className="text-center"><span className={obj.sar.status === "Open" ? "label label-success" : obj.sar.status === "InProgress" ? "label label-warning"
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
                                <br />
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

function mapStateToProps(state, props) {
    return {
        getSarSuccess: state.sar.sarSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        SarAction: bindActionCreators(SarAction, dispatch),
        UserAction: bindActionCreators(UserAction, dispatch),
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectAccessRequestComponent);






