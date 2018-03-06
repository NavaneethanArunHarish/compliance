import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';

import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';

import assessmentAction from '../../actions/dpiaAction/assessmentAction';

import '../../../../assests/css/custom.css'
import '../../../../assests/css/custom.min.css';

class DpiaExUserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            allAssess: [],
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
            <div className={this.state.navBar}>
             {this.state.isLoggedIn ? 
                <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <div className="main_container">
                        <SideBar />
                        <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                        <div className="right_col" role="main">
                            <div className="">
                                <div className="clearfix"></div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">

                                            <div className="x_content">

                                                <div className="filter-box">

                                                </div>


                                                <p className="lead">Assigned DPIA/PIA</p>
                                                <div id="datatable_wrapper" >
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{width: "100%"}}>
                                                                <thead>
                                                                    <tr role="row">
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{width: "226px"}}>Assessment Name</th>
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{width: "226px"}}>Project Name</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Assigned by: activate to sort column ascending" style={{width: "449px"}}>Assigned by</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Due Date: activate to sort column ascending" style={{width: "168px"}}>Due Date</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Risk Rating: activate to sort column ascending" style={{width: "201px"}}>Risk Rating</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Comment: activate to sort column ascending" style={{width: "175px"}}>Comment</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{width: "133px"}}>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>




                                                                    <tr role="row" className="odd">
                                                                        <td className="sorting_1">Marketing Assessment</td>
                                                                        <td>CC Suite</td>
                                                                        <td>Giacomo Guilizzoni Founder &amp; CEO</td>
                                                                        <td>15-Jan-2018</td>
                                                                        <td>5</td>
                                                                        <td>Good</td>

                                                                        <td className="text-center">
                                                                            <a className="btn btn-default sar-action" href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View"><em className="fa fa-eye"></em></a>

                                                                        </td>

                                                                    </tr></tbody>
                                                            </table></div></div></div>






                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">

                                            <div className="x_content">

                                                <div className="filter-box">
                                                </div>


                                                <p className="lead">Completed DPIA/PIA</p>
                                                <div id="datatable_wrapper" >
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{width: "100%"}}>
                                                                <thead>
                                                                    <tr role="row">
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{width: "226px"}}>Assessment Name</th>
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{width: "226px"}}>Project Name</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Assigned by: activate to sort column ascending" style={{width: "449px"}}>Assigned by</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Due Date: activate to sort column ascending" style={{width: "168px"}}>Due Date</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Risk Rating: activate to sort column ascending" style={{width: "201px"}}>Risk Rating</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Comment: activate to sort column ascending" style={{width: "175px"}}>Comment</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{width: "133px"}}>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>




                                                                    <tr role="row" className="odd">
                                                                        <td className="sorting_1">Marketing Assessment</td>
                                                                        <td>CC Suite</td>
                                                                        <td>Giacomo Guilizzoni Founder &amp; CEO</td>
                                                                        <td>15-Jan-2018</td>
                                                                        <td>5</td>
                                                                        <td>Good</td>

                                                                        <td className="text-center">
                                                                            <a className="btn btn-default sar-action" href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View"><em className="fa fa-eye"></em></a>

                                                                        </td>

                                                                    </tr></tbody>
                                                            </table></div></div></div>






                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">

                                            <div className="x_content">

                                                <div className="filter-box">

                                                </div>


                                                <p className="lead">Managed DPIA/PIA</p>
                                                <div id="datatable_wrapper" >
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{width: "100%"}}>
                                                                <thead>
                                                                    <tr role="row">
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{width: "226px"}}>Assessment Name</th>
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{width: "226px"}}>Project Name</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Assigned by: activate to sort column ascending" style={{width: "449px"}}>Assigned by</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Due Date: activate to sort column ascending" style={{width: "168px"}}>Due Date</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Risk Rating: activate to sort column ascending" style={{width: "201px"}}>Risk Rating</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Comment: activate to sort column ascending" style={{width: "175px"}}>Comment</th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{width: "133px"}}>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>




                                                                    <tr role="row" className="odd">
                                                                        <td className="sorting_1">Marketing Assessment</td>
                                                                        <td>CC Suite</td>
                                                                        <td>Giacomo Guilizzoni Founder &amp; CEO</td>
                                                                        <td>15-Jan-2018</td>
                                                                        <td>5</td>
                                                                        <td>Good</td>

                                                                        <td className="text-center">
                                                                            <a className="btn btn-default sar-action" href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View"><em className="fa fa-eye"></em></a>

                                                                        </td>

                                                                    </tr></tbody>
                                                            </table></div></div></div>






                                            </div>
                                        </div>
                                    </div>
                                </div>






                            </div>
                        </div>
                        <Footer />
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
        // getSarSuccess: state.sar.sarSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        assessmentAction: bindActionCreators(assessmentAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DpiaExUserDashboard);