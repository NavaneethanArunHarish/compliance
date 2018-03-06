import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';
import Action from '../../../../actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../LoginPage/PopUpLogin';
import DataTable from 'datatables.net';
import 'datatables.net-bs/js/dataTables.bootstrap';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import '../../../../../../assests/css/custom.css' 
 
import '../../../../../../assests/css/custom.min.css' 
import { PulseLoader } from 'react-spinners';
import { Pagination, Icon } from 'semantic-ui-react';

var sarData;

class SARAssign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sarDetails: [],
            navBar: 'nav-md',
            loading: false,
            success: false,
            currentPage: 0,
            totalPage: 0,
            pageCount: 10,
            totalPages: 0,
            startCount: 1,
            isLoggedIn:false,
            openPopUpLogin:false,
            previousUrl:''

        }

        this.handleNavBar = this.handleNavBar.bind(this);
        this.sarAssignTo = this.sarAssignTo.bind(this);
        this.getSarResponse = this.getSarResponse.bind(this);
        this.getSAR = this.getSAR.bind(this);
        this.PageCountResponse = this.PageCountResponse.bind(this);

     this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
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
                $('#assign').DataTable();
                $("#assign_info").hide();
                $("#assign_paginate").hide();
                $("#assign_length").hide();
                $("#assign_filter").hide();
            });
        }
    }


    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    sarAssignTo(value) {
        browserHistory.push({
            pathname: '/sar/leader/SAR-assignTo/'+value.sar.id,
            state: { data: value }
        });
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

    getSAR = (e, { activePage }) => this.props.Action.getPageCount(activePage, this.state.pageCount, this.PageCountResponse);

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
                                <div className="">
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
                                        </div> */}
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

                                                    <p className="lead">Assign SAR </p>
                                                    <table id="assign" className="table table-striped table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>SAR ID</th>
                                                                <th>External User Name</th>
                                                                <th>Representative</th>
                                                                <th>Description</th>
                                                                <th>Creation Date</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.sarDetails.map(function (obj, index) {
                                                                return (<tr>
                                                                    <td><a href="javascript:;">{obj.sar.id}</a></td>
                                                                    <td>{obj.sar.externalUser}</td>
                                                                    <td>{obj.sar.representative}</td>
                                                                    <td>{obj.sar.sarDescription}</td>
                                                                    <td>{obj.sar.creation_time}</td>
                                                                    <td class="text-center"> <a class="btn btn-sm btn-primary btn-round" onClick={() => this.sarAssignTo(obj)} style={{ color: '#fff' }}>  Assign</a></td>
                                                                </tr>)
                                                            }.bind(this))}
                                                        </tbody>
                                                    </table>
                                                    {this.state.loading === true ? <div>
                                                        <center>
                                                            <PulseLoader
                                                                color={'#F15A25'}
                                                                loading={this.state.loading}
                                                            />
                                                        </center>
                                                    </div> : ''}

                                                    {this.state.sarDetails.length === 0 && this.state.success === true ? <center><p>No Records Found</p></center> : ''}
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
                                                                    lastItem={{ content: <Icon name='angle double right' />, icon: true, className: this.state.sarDetails.length === 0 ? " disabledtable" : '' }}
                                                                    prevItem={{ content: <Icon name='angle left' />, icon: true, className: this.state.currentPage === 1 ? "disabledtable" : '' }}
                                                                    nextItem={{ content: <Icon name='angle right' />, icon: true, className: this.state.sarDetails.length === 0 ? " disabledtable" : '' }}
                                                                    boundaryRange={10} />
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
        getSarSuccess: state.sar.sarSuccess
    };
}
function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARAssign);






