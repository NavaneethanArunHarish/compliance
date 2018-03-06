import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';

import '../../../../../../assests/css/custom.css';

import '../../../../../../assests/css/custom.min.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PulseLoader } from 'react-spinners';
import UserAction from '../../../../actions'

class AdminSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
            allUserDetails: [],
            adminUserDetails:[],
            loading: false,
            user_id:0

        }

        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.getAdminUserResponse = this.getAdminUserResponse.bind(this);
        this.userSelect = this.userSelect.bind(this);
        this.userAdd = this.userAdd.bind(this);
        this.userRemove = this.userRemove.bind(this);
        this.refresh = this.refresh.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.setState({ loading: true })
        this.props.UserAction.getallUser(this.getallUserResponse);

        var usertype = 'Administrator'
        this.props.UserAction.getUserByType(usertype, this.getAdminUserResponse);
    }

    getallUserResponse(value) {
        this.setState({ loading: false })
        this.setState({ allUserDetails: value.data.data })     
    }

    getAdminUserResponse(value) {
        console.log("all admins--------------->", value)
        this.setState({ adminUserDetails: value.data.data })
    }
    userSelect(data) {
        this.setState({ user_id: data.id })
       
    }
    userAdd(e) {
        e.preventDefault();
        
        var obj={
         user_id : this.state.user_id,
         user_type :'Administrator' 
        }
        console.log("obj data admin--------------->", obj)
        this.props.UserAction.updateUserType(obj, this.refresh);
    }

    userRemove(e) {
        e.preventDefault();
        
        var obj={
         user_id : this.state.user_id,
         user_type :'None' 
        }
        console.log("obj data admin--------------->", obj)
        this.props.UserAction.updateUserType(obj, this.refresh);
    }

refresh(){

    this.setState({ loading: true })
    this.props.UserAction.getallUser(this.getallUserResponse);
    var usertype = 'Administrator'
    this.props.UserAction.getUserByType(usertype, this.getAdminUserResponse);          
                
}
submit(e){
    e.preventDefault();
       this.setState({ loading: true })
        this.props.UserAction.getallUser(this.getallUserResponse);

        var usertype = 'Administrator'
        this.props.UserAction.getUserByType(usertype, this.getAdminUserResponse);
}


    render() {
        return (
            <div className="col-xs-10">

                <div className="tab-content">

                    <div className="tab-pane active" id="site-administrators">
                        <p className="lead">Manage Site Administrator</p>

                        <form id="assignform" method="post" action="#">
                            <div id="yui_3_17_2_1_1516171062459_93">
                                <input type="hidden" name="sesskey" value="l7ZaRlWeWU" />

                                <table className="generaltable table generalbox groupmanagementtable boxaligncenter" summary="" id="yui_3_17_2_1_1516171062459_92">
                                    <tbody id="yui_3_17_2_1_1516171062459_91"><tr id="yui_3_17_2_1_1516171062459_90">
                                        <td id="existingcell">
                                            <p id="yui_3_17_2_1_1516171062459_89">
                                                <label htmlFor="removeselect" id="yui_3_17_2_1_1516171062459_88">Current site administrators</label>
                                            </p>
                                            <div className="userselector" id="removeselect_wrapper">
                                                <select name="removeselect" id="removeselect" size="20" className="form-control no-overflow">
                                                    <optgroup label={"Main administrator(" +this.state.adminUserDetails.length+")"}>
                                                        {this.state.adminUserDetails.map(function (obj, index) {
                                               return (
                                                      <option value="2" onClick={() => this.userSelect(obj)}>{obj.name} ( {obj.user_type}, {obj.email})</option>
                                                    )
                                                    }.bind(this))}


                                                    </optgroup>
                                                </select>
                                                <div className="form-inline">
                                                    <label htmlFor="removeselect_searchtext">Search</label><input type="text" name="removeselect_searchtext" id="removeselect_searchtext" size="15" value="" className="form-control" />
                                                    <input type="button" value="Clear" className="btn btn-secondary m-x-1" id="removeselect_clearbutton" disabled="" />
                                                </div>
                                            </div>

                                        </td>
                                        <td id="buttonscell">
                                            <p className="arrow_button">
                                                <input   onClick={this.userAdd} name="add" id="add" type="submit" value="◄&nbsp;Add" title="Add" className="btn btn-primary"   /><br />
                                                <input onClick={this.userRemove} name="remove" id="remove" type="submit" value="Remove&nbsp;►" title="Remove" className="btn btn-primary" /><br />
                                                <input onClick={this.submit} name="main" id="main" type="submit" value="Set main admin" title="Set main admin" className="btn btn-primary" />
                                            </p>
                                        </td>
                                        <td id="potentialcell">
                                            <p>
                                                <label htmlFor="addselect">Users</label>
                                            </p>
                                            <div className="userselector" id="addselect_wrapper">
                                                <select name="addselect" id="addselect" size="20" className="form-control no-overflow">
                                                    <optgroup label="Users">

                                         {this.state.allUserDetails.map(function (obj, index) {
                                             if(obj.user_type === 'None'){
                                            return (
                                                      <option onClick={() => this.userSelect(obj)}>{obj.name} ( {obj.user_type}, {obj.email})</option>
                                                    )}
                                                    }.bind(this))}

                                                    </optgroup>
                                                </select>
                                                <div className="form-inline">
                                                    <label htmlFor="addselect_searchtext">Search</label>
                                                    <input type="text" name="addselect_searchtext" id="addselect_searchtext" size="15" value="" className="form-control" />
                                                    <input type="button" value="Clear" className="btn btn-secondary m-x-1" id="addselect_clearbutton" disabled="" />
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                    </tbody></table>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        );

    }
}


function mapStateToProps(state, props) {
    //console.log("response data----->",state.login)
    return {
        getUserSuccess: state.login.userSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserAction: bindActionCreators(UserAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSite);
