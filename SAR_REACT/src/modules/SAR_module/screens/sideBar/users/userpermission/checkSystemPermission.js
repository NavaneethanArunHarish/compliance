import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';

import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'

export default class CheckSysPermission extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="check-system-permissions">
                        <p className="lead">Check system permissions</p>

                        <div id="chooseuser" className="generalbox boxwidthnormal boxaligncenter p-y-1">
                            <form method="post" action="http://35.169.62.69/admin/roles/check.php?contextid=1" id="yui_3_17_2_1_1516171788075_67"><h3 id="yui_3_17_2_1_1516171788075_71">
                                <label htmlFor="reportuser" id="yui_3_17_2_1_1516171788075_70">Select a user</label></h3><div className="userselector" id="reportuser_wrapper">
                                    <select name="reportuser" id="reportuser" size="20" className="form-control no-overflow">
                                        <optgroup label="Potential users (1)">
                                            <option value="2">Admin User (saravanakumar@10decoders.in)</option>
                                        </optgroup>
                                    </select>
                                    <div className="form-inline">
                                        <label htmlFor="reportuser_searchtext">Search</label>
                                        <input type="text" name="reportuser_searchtext" id="reportuser_searchtext" size="15" value="" className="form-control" />
                                        <input type="button" value="Clear" className="btn btn-secondary m-x-1" id="reportuser_clearbutton" disabled="" />
                                        <div id="userselector_options" className="collapsibleregion  collapsed" style={{height: "21px" }}>
                                            <div id="userselector_options_sizer">
                                                <div id="userselector_options_caption" className="collapsibleregioncaption">
                                                    <a href="#" title="Click to expand or collapse">Search options <img src="http://35.169.62.69/theme/image.php/boost/core/1515494561/t/collapsed" alt="" /></a>
                                                </div>
                                                <div id="userselector_options_inner" className="collapsibleregioninner">

                                                </div></div></div></div>
                                </div>

                                <p id="chooseusersubmit">
                                    <input type="submit" value="Show this user's permissions" className="btn btn-primary" /></p>
                            </form>
                        </div>

                    </div>
                </div>
            </div>




        );

    }
}

