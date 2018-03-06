import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import Img1 from '../../../../../assests/images/DPIAPIAManagementR13.jpg';
import Img2 from '../../../../../assests/images/DPIAPIAManagementR15.jpg';
import Img3 from '../../../../../assests/images/DPIAPIAManagementR16.jpg';
import Img4 from '../../../../../assests/images/DPIAPIAManagementR14.jpg';
import Img5 from '../../../../../assests/images/DPIAPIAManagementR11.jpg';
import Img6 from '../../../../../assests/images/DPIAPIAManagementR12.jpg';
import Img7 from '../../../../../assests/images/DPIAPIAManagementR17.jpg';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class LicencePurchaseRenewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <div class="nav-md">
                    <div class="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div class="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar}/>
                            <div class="right_col" role="main">
                                <div class="row">
                                    <div>
                                        <div class="page-title">
                                            <div class="title_left">
                                                <h3>License Purchase</h3>
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
                                                        <h2>License Purchase </h2>



                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="x_content">
                                                        <div class="row">
                                                            <div class="col-md-9 col-md-offset-1">

                                                                <table class="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-center"><img src={Img2} alt="" /></th>
                                                                            <th class="text-center"><img src={Img5} alt="" width="130" /></th>
                                                                            <th class="text-center"><img src={Img1} alt="" width="130" /></th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>







                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <center>
                                                                            <button class="btn btn-primary btn">Purchase</button>
                                                                            <button class="btn btn-default btn">Renew License</button>
                                                                        </center>

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
            </div>
        );
    }
}

export default LicencePurchaseRenewComponent;




