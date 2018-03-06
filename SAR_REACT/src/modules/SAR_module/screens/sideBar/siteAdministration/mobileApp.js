import React, { Component } from 'react';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class mobileAppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <div class="right_col" role="main" style={{ marginLeft: '0px' }}>
                    <div class="">
                        <div class="page-title">
                            <div class="title_left">
                                <h3>Mobile app</h3>
                            </div>

                            <div class="title_right">
                                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search for..."/>
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
                                            <h2>Mobile app settings</h2>

                                            <div class="clearfix"></div>
                                        </div>
                                        <div class="x_content">
                                            <div class="col-md-10">
                                                <p class="lead">Front page settings </p>
                                                <fieldset>
                                                    <div class="clearer"></div>
                                                    <div class="form-item row" id="admin-enablemobilewebservice">
                                                        <div class="form-label col-sm-3 text-sm-right">
                                                            <label for="id_s__enablemobilewebservice">
                                                                Enable web services for mobile devices
        </label>
                                                            <span class="form-shortname d-block small text-muted">enablemobilewebservice</span>
                                                        </div>
                                                        <div class="form-setting col-sm-9">
                                                            <div class="form-checkbox defaultsnext">
                                                                <input type="hidden" name="s__enablemobilewebservice" value="0"/>
                                                                    <input type="checkbox" name="s__enablemobilewebservice" value="1" id="id_s__enablemobilewebservice"/>
</div>
                                                                    <div class="form-defaultinfo text-muted ">Default: No</div>
                                                                    <div class="form-description m-t-1"><p>Enable mobile service for the official Moodle app or other app requesting it. For more information, read the <a href="http://docs.moodle.org/34/en/Enable_mobile_web_services">Moodle documentation</a></p>
                                                                    </div>
    </div>
                                                            </div></fieldset>

                                                        <div class="row form-group">
                                                            <div class="col-sm-offset-3 col-sm-3">
                                                                <button type="submit" class="btn btn-primary">Save changes</button>
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

                        );
    }
}

export default mobileAppComponent;
