import React, { Component } from 'react';
import PopUpLogin from '../../../LoginPage/PopUpLogin';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';
import { Doughnut, Bar,Line } from 'react-chartjs-2';
import { Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchInput, { createFilter } from 'react-search-input'
import { PulseLoader } from 'react-spinners';
import SarAction from '../../../../actions';
import UserAction from '../../../../actions';
import Action from '../../../../actions';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import '../../../../../../assests/css/custom.css';
 
import '../../../../../../assests/css/custom.min.css';
const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      backgroundColor: "#26B99A",
      data: [51, 30, 40, 28, 92, 50, 45]
    }, {
      backgroundColor: "#03586A",
      data: [41, 56, 25, 48, 72, 34, 12]
    }]
};

const options={
    legend: {
        display: false,
    },
};

const lineChartData =
    {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          backgroundColor: "rgba(38, 185, 154, 0.31)",
          borderColor: "rgba(38, 185, 154, 0.7)",
          pointBorderColor: "rgba(38, 185, 154, 0.7)",
          pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointBorderWidth: 1,
          data: [31, 74, 6, 39, 20, 85, 7]
        }, {
          backgroundColor: "rgba(3, 88, 106, 0.3)",
          borderColor: "rgba(3, 88, 106, 0.70)",
          pointBorderColor: "rgba(3, 88, 106, 0.70)",
          pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(151,187,205,1)",
          pointBorderWidth: 1,
          data: [82, 23, 66, 9, 99, 4, 2]
        }]
    }

const KEYS_TO_FILTERS = ['sar.externalUser', 'sar.representative', 'sar.sarDescription', 'sar.id', 'sar.status', 'sar.assignedTo', 'sar.creation_time']

class DpoDashboard extends Component {
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
            startCount: 1,
            loading: true,
            success: false,
            allUserDetails: [],
            searchTerm: '',
            checkTotalPage: 0,
            checkPages: false,
            advanceSearch: 'Select',
            escalationCount: {},
            email: '',
            password: '',
            loggedUserType:'',
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
        this.userResponse = this.userResponse.bind(this);
        this.filter = this.filter.bind(this);
        this.getAdvanceSearch = this.getAdvanceSearch.bind(this);
        this.getAdvanceClear = this.getAdvanceClear.bind(this);
        this.afterGetEscalationCount = this.afterGetEscalationCount.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    reloadPage() {
        window.location.reload();
    }

    componentWillMount(){
        var loggedUserType = localStorage.getItem("userType");
        this.setState({loggedUserType : loggedUserType});
         var userId = localStorage.getItem("userId");
        if(this.props.location.state !== undefined || userId !== null) {
            console.log('logged in user');
            if(this.props.location.state !== undefined) {
            this.setState({email:this.props.location.state.email})
            this.setState({password:this.props.location.state.pwd})
            }
            this.setState({ loading: true,isLoggedIn:true });
            this.props.SarAction.getPageCount(1, 10, this.PageCountResponse);
            var usertype = 'ComplainceTeamMember'
            this.props.UserAction.getUserByType(usertype, this.getallUserResponse);
            this.props.SarAction.getEscalationCount(this.afterGetEscalationCount);
        }else{
            console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ',prevUrl);
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
        }
        
    }

    userResponse(response) {
    var user = response.data.data;
    this.setState({ 
       userDetails : user,
     })
     localStorage.setItem("user",JSON.stringify(user));
}

    afterGetEscalationCount(data) {
        console.log("------afterGetEscalationCount---------", data);
        var totalCount = data.data.data;
        const data1 = {
            labels: [
               "The Right to Information",
               "Copy of Data",
               "Length data was held",
               "Right to rectification",
               "Right to erasure (right to be forgotten)",
               "Right to restrict processing",
               "Right to object",
               "The right to not be evaluated on the basis of automated processing",
               "The right to bring class actions",
               "The right to subject access"
            ],
            datasets: [{
                data: [totalCount.the_right_to_information,totalCount.copy_of_data,totalCount.lenght_data_was_held,
                    totalCount.right_to_rectification, totalCount.right_to_erasure, totalCount.right_to_restrict_processing,
                    totalCount.right_to_object, totalCount.right_not_to_be_evaluated, totalCount.the_right_to_bring_class_actions,
                    totalCount.the_right_of_subject_acess],
                backgroundColor: [
                    '#26b99a',
                    '#03586a',
                    '#26b99a',
                    '#9b59b6',
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e",
                    '#03586a',
                    '#26b99a',
                    '#9b59b6'
                ]
            }],
            text: '23%'
        };
        this.setState({
            escalationCount : data1
        })
    }
    getAdvanceSearch(e) {
        console.log("search sar------------->", e.target.value)
        if (e.target.value !== 'Select') {
            this.setState({ advanceSearch: e.target.value })
        }
    }

    getAdvanceClear(e) {
        this.setState({ advanceSearch: 'Select' })
        this.props.SarAction.getPageCount(1, 10, this.PageCountResponse);
        //this.componentWillMount();
    }

    filter() {


        if (this.state.advanceSearch == 'All') {
            this.props.SarAction.getPageCount(1, 10, this.PageCountResponse);
        }
        else {
            this.props.Action.searchSar(this.state.advanceSearch, this.getSearchSarResponse);
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

        this.setState({ loading: false, success: true, checkPages: true })
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
        console.log("search result------------->", value.data.data)
        this.setState({ loading: false, success: true })
        this.setState({
            currentPage: value.data.data.page,
            totalPage: value.data.data.pages,
            sarDetails: value.data.data,
        });
        // $('#example').DataTable();
        // $("#example").ajax.reload();
        // $("#example_info").hide();
        // $("#example_paginate").hide();
        // $("#example_length").hide();
        // $("#example_filter").hide();
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
        const filteredEmails = this.state.sarDetails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))     
        return (
            <div>
            {this.state.isLoggedIn ? 
                <div className={this.state.navBar}>
                    <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div className="main_container">
                            <SideBar email={this.state.email} password={this.state.password} handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            {/* // <!-- page content --> */}
                            <div className="right_col" role="main">
                                <div className="">


                                    <div className="clearfix"></div>

                                    <div className="row">


                                        <div className="col-md-4 col-sm-6 col-xs-12 ">
                                            <div className="x_panel marginPadding">
                                                <div className="x_title">
                                                    <h2>Escalations to  <small>ICO</small></h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <Doughnut data={this.state.escalationCount}
                                                    options={options} />
                                                    {/* <canvas id="canvasDoughnut" style={{width:'300px',height:'150px'}}></canvas> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <div className="x_panel marginPadding">
                                                <div className="x_title">
                                                    <h2>Time <small>SARS per week</small></h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <Bar
                                                        data={barData}
                                                        width={300}
                                                        height={150}
                                                        options={{
                                                            maintainAspectRatio: false
                                                        }}
                                                    />
                                                    {/* <canvas id="mybarChart" ></canvas> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                            <div className="x_panel marginPadding">
                                                <div className="x_title">
                                                    <h2>SARS <small> Per Month</small></h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <Line data={lineChartData}
                                                     
                                                        width={300} height={150} />
                                                    {/* <canvas id="lineChart"></canvas> */}
                                                </div>
                                            </div>
                                        </div>

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
                                                                        <select name="escalated" id="" onChange={this.getAdvanceSearch} className="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="Yes">Yes</option>
                                                                            <option value="No">No</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label >Priority</label>
                                                                        <select name="priority" id="" onChange={this.getAdvanceSearch} className="form-control">
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
                                                                        <select name="status" id="" onChange={this.getAdvanceSearch} className="form-control">
                                                                            <option value="Select">Select</option>
                                                                            <option value="New">New</option>
                                                                            <option value="Closed">Closed</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label >Assigned To</label>
                                                                        <select name="assign" className="form-control" defaultValue='Select' onChange={this.getAdvanceSearch} required="" >
                                                                            <option value="Select">Select</option>

                                                                            {this.state.allUserDetails.map(function (obj, index) {

                                                                                return (
                                                                                    <option value={obj.name}>{obj.name}</option>

                                                                                )
                                                                            }.bind(this))}
                                                                            <option value="All">All</option>
                                                                        </select>


                                                                    </div>
                                                                    <div className="form-group text-right">
                                                                        <button className="btn btn-default" onClick={this.getAdvanceClear} >Clear</button>
                                                                        <button className="btn btn-primary" onClick={this.filter} >Search</button>
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
                            {/* // <!-- /page content --> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(DpoDashboard);
