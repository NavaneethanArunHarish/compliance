import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';

import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'

export default class CreateLDAP extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="add-ldap-user">
                        <p className="lead">Search LDAP/AD users</p>

                        <div className="form-group fitem row">
                            <div className="col-md-2">

                                <label className="col-form-label d-inline " htmlFor="id_firstname">
                                    Email
                        </label>
                            </div>
                            <div className="col-md-4 form-inline felement" data-fieldtype="text">
                                <input type="text" className="form-control " name="ldap-email" id="id_ldapemail" value="" size="30" maxLength="100" />


                            </div>
                            <div className="col-md-2 form-inline felement" data-fieldtype="text">
                                <input type="submit" value="Search" className="btn btn-primary " />

                            </div>
                        </div>

                        <div className="form-group fitem row">
                            <div className="col-md-2">

                                <label className="col-form-label d-inline " htmlFor="id_firstname">
                                    First Name
</label>
                            </div>
                            <div className="col-md-4 form-inline felement" data-fieldtype="text">
                                <input type="text" className="form-control " name="ldap-fname" id="id_ldapfname" value="" size="30" maxLength="100" />


                            </div>
                            <div className="col-md-2 form-inline felement" data-fieldtype="text">
                                <input type="submit" value="Search" className="btn btn-primary " />

                            </div>
                        </div>


                        <div className="no-overflow"><table className="table table-bordered" id="users">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><a href="user.php?sort=firstname&amp;dir=ASC">First name</a> / <a href="user.php?sort=lastname&amp;dir=ASC">Surname</a></th>
                                    <th><a href="user.php?sort=email&amp;dir=ASC">Email address</a></th>
                                    <th><a href="user.php?sort=city&amp;dir=ASC">City/town</a></th>
                                    <th><a href="user.php?sort=country&amp;dir=ASC">Country</a></th>


                                </tr>
                            </thead>
                            <tbody><tr className="lastrow">
                                <td> <input type="checkbox" /> </td>
                                <td><a>Admin User</a></td>
                                <td>saravanakumar@10decoders.in</td>
                                <td>Chennai</td>
                                <td>India</td>



                            </tr>
                            </tbody>
                        </table>
                            <center><button className="btn btn-primary">Add Users</button></center>
                        </div>

                    </div>
                </div>
            </div>
        )

    }
}

