import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import Footer from '../../../../../components/Footer';
import { Pagination, Icon } from 'semantic-ui-react';
import PopUpLogin from '../../LoginPage/PopUpLogin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'
import SarAction from '../../../../SAR_module/actions';

class SubjectAccessRequestDpoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            isLoggedIn:false,
      openPopUpLogin:false,
      previousUrl:''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
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
      }
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    render() {
        return (
            <div>
            {this.state.isLoggedIn ? 
                <div className={this.state.navBar}>
                    <div class="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div class="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar}/>
                            <div class="right_col" role="main">
                                <div class="">
                                    <div class="page-title">
                                        <div class="title_left">
                                            <h3>Subject Access Request</h3>
                                        </div>

                                        <div class="title_right">
                                            <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Search for..." />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-default" type="button">Go!</button>
                                                    </span>
                                                </div>
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

                                                    <div class="filter-box">

                                                        <div class="dpo-page" role="tabpanel" data-example-id="togglable-tabs">
                                                            <ul id="myTab" style={{ display: "inline-flex" }} class="nav nav-tabs bar_tabs" role="tablist">
                                                                <li role="presentation" class="active"><a href="#tab_content1" id="sardetail-tab" role="tab" data-toggle="tab" aria-expanded="true">DPO Details</a>
                                                                </li>
                                                                <li role="presentation" class=""><a href="#tab_content2" role="tab" id="userdetail-tab" data-toggle="tab" aria-expanded="false">Type of Data Captured</a>
                                                                </li>
                                                                <li role="presentation" class=""><a href="#tab_content3" role="tab" id="comments-tab" data-toggle="tab" aria-expanded="false">Location of Data</a>
                                                                </li>
                                                            </ul>


                                                            <div id="myTabContent" class="tab-content">
                                                                <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <label for="">Name:</label>
                                                                            Sample Name
                        </div>

                                                                        <div class="col-md-4">
                                                                            <label for="">Email:</label>
                                                                            abc@test.com
                        </div>


                                                                    </div>

                                                                </div>

                                                                <div role="tabpanel" class="tab-pane fade active in" id="tab_content2" aria-labelledby="home-tab">

                                                                </div>

                                                                <div role="tabpanel" class="tab-pane fade active in" id="tab_content3" aria-labelledby="home-tab">

                                                                </div>

                                                            </div>


                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <center><button class="btn btn-success">Raise a Subject Access Request</button>
                                                                    <button class="btn btn-danger">Report Abuse</button>
                                                                </center>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="lead">SARs Created by me </p>
                                                    <div id="datatable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                                        <div class="row">
                                                            <div class="col-sm-">
                                                                <div class="dataTables_length" id="datatable_length">
                                                                    <label>Show <select name="datatable_length" class="form-control input-sm">
                                                                        <option value="10">10</option>
                                                                        <option value="25">25</option>
                                                                        <option value="50">50</option>
                                                                        <option value="100">100</option></select> entries</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div id="datatable_filter" class="dataTables_filter">
                                                                    <label>Search:<input type="search" class="form-control input-sm" placeholder="" /></label>
                                                                </div></div>
                                                        </div>
                                                        <div class="row"><div class="col-sm-12"><table id="datatable" class="table table-striped table-bordered dataTable no-footer" width="100%" cellspacing="0" role="grid" aria-describedby="datatable_info" style={{ "width": "100%" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>SAR ID</th>
                                                                    <th>Actions</th>
                                                                    <th></th>
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
                                                                <tr>
                                                                    <td><a href="sar-details.html">001</a></td>
                                                                    <td> <a class="btn btn-default sar-action" href="sar-details.html"><em class="fa fa-pencil"></em></a>
                                                                        <a class="btn btn-danger sar-action"><em class="fa fa-trash"></em></a></td>
                                                                    <td>05</td>
                                                                    <td>Giacomo Guilizzoni
Founder & CEO</td>
                                                                    <td>Marco Polo</td>
                                                                    <td>Lorem Ipsum</td>
                                                                    <td>Yes</td>
                                                                    <td>High</td>
                                                                    <td class="text-center"><span class="label label-success">New</span></td>
                                                                    <td>Bob</td>
                                                                    <td>15-Jan-2018</td>
                                                                </tr>

                                                                <tr>
                                                                    <td><a href="sar-details.html">005</a></td>
                                                                    <td> <a class="btn btn-default sar-action" href="sar-details.html"><em class="fa fa-pencil"></em></a>
                                                                        <a class="btn btn-danger sar-action"><em class="fa fa-trash"></em></a></td>
                                                                    <td>05</td>
                                                                    <td>Marco Botton
Tuttofare</td>
                                                                    <td>Marco Polo</td>
                                                                    <td>Lorem Ipsum</td>
                                                                    <td>No</td>
                                                                    <td>Medium</td>
                                                                    <td class="text-center"><span class="label label-danger">Closed</span></td>
                                                                    <td>Alice</td>
                                                                    <td>16-Jan-2018</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><a href="sar-details.html">031</a></td>
                                                                    <td> <a class="btn btn-default sar-action" href="sar-details.html"><em class="fa fa-pencil"></em></a>
                                                                        <a class="btn btn-danger sar-action"><em class="fa fa-trash"></em></a></td>
                                                                    <td>25</td>
                                                                    <td>Mariah Maclachlan
Better Half</td>
                                                                    <td>Tom Alter</td>
                                                                    <td></td>
                                                                    <td>No</td>
                                                                    <td>Normal</td>
                                                                    <td class="text-center"><span class="label label-success">New</span></td>
                                                                    <td>Bob</td>
                                                                    <td>15-Jan-2018</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><a href="sar-details.html">035</a></td>
                                                                    <td> <a class="btn btn-default sar-action" href="sar-details.html"><em class="fa fa-pencil"></em></a>
                                                                        <a class="btn btn-danger sar-action"><em class="fa fa-trash"></em></a></td>
                                                                    <td>15</td>
                                                                    <td>Valerie Liberty
Head Chef</td>
                                                                    <td>Tom Alter</td>
                                                                    <td></td>
                                                                    <td>Yes</td>
                                                                    <td>Normal</td>
                                                                    <td class="text-center"><span class="label label-warning">In Progress</span></td>
                                                                    <td>Kipling</td>
                                                                    <td>23-Jan-2018</td>
                                                                </tr>

                                                            </tbody>
                                                        </table></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-5">
                                                                <div class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing 1 to 4 of 4 entries</div></div>
                                                            <div class="col-sm-7">
                                                                <div class="pull-right">
                                                                    <Pagination
                                                                        defaultActivePage={1}
                                                                        totalPages={1}
                                                                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                                                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                                                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                                                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                                                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
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

// function mapStateToProps(state, props) {
//     return {
//         getSarSuccess: state.sar.sarSuccess
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         SarAction: bindActionCreators(SarAction, dispatch)
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SubjectAccessRequestComponent);

export default SubjectAccessRequestDpoComponent;




