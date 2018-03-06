import React, { Component } from 'react';
import Switch from 'react-switchery';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import welcomeImg from '../../../../assests/images/img.jpg';
import Img1 from '../../../../assests/images/DPIAPIAManagementR13.jpg';
import Img2 from '../../../../assests/images/DPIAPIAManagementR15.jpg';
import Img3 from '../../../../assests/images/DPIAPIAManagementR16.jpg';
import Img4 from '../../../../assests/images/DPIAPIAManagementR14.jpg';
import Img5 from '../../../../assests/images/DPIAPIAManagementR11.jpg';
import Img6 from '../../../../assests/images/DPIAPIAManagementR12.jpg';
import Img7 from '../../../../assests/images/DPIAPIAManagementR17.jpg';
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';

class dashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <div class="col-md-3">
                    <div class="x_panel">
                      <div class="x_title">
                        <h2>Service Status </h2>

                        <div class="clearfix"></div>
                      </div>
                      <div class="x_content">
                        <article class="media event">
                          <a class="pull-left">
                            <img src={Img1} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    {/* <input type="checkbox" class="js-switch" checked /> */}
                                    <Switch
                                      className="switch-class"
                                      //onChange={this.onChange}
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                        <article class="media event">
                          <a class="pull-left">
                            <img src={Img2} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    {/* <input type="checkbox" class="js-switch" checked /> */}
                                    <Switch
                                      className="switch-class"
                                      //onChange={this.onChange}
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>

                        {/* <article class="media event">
                          <a class="pull-left">
                            <img src={Img3} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    <Switch
                                      className="switch-class"
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article> */}


                        {/* <article class="media event">
                          <a class="pull-left">
                            <img src={Img4} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    <Switch
                                      className="switch-class"
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article> */}

                        <article class="media event">
                          <a class="pull-left">
                            <img src={Img5} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    {/* <input type="checkbox" class="js-switch" checked /> */}
                                    <Switch
                                      className="switch-class"
                                      //onChange={this.onChange}
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>

                        {/* <article class="media event">
                          <a class="pull-left">
                            <img src={Img6} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    <Switch
                                      className="switch-class"
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>


                        <article class="media event">
                          <a class="pull-left">
                            <img src={Img7} alt="" style={{ width: "60px" }} />
                          </a>
                          <div class="media-body">
                            <div class="form-group">
                              <label class="control-label col-md-4 col-sm-4 col-xs-12">Switch</label>
                              <div class="col-md-8 col-sm-8 col-xs-12">
                                <div class="">
                                  <label>
                                    <Switch
                                      className="switch-class"
                                      options={
                                        {
                                          color: '#2ECC71',
                                          size: 'tiny'
                                        }
                                      }
                                      checked
                                       />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article> */}

                      </div>
                    </div>
                  </div>


                  <div class="col-md-6">
                    <div class="x_panel">

                      <div class="x_content">
                        <div class="row top_tiles" style={{ margin: '10px 0' }}>
                          <div class="col-md-6 col-sm-6 col-xs-6 tile">
                            <span>Number of concurrent users</span>
                            <h2>231,809</h2>
                            <span class="sparkline_one" style={{ height: '160px' }}>
                              <canvas width="200" height="60" style={{ display: 'inline-block', verticalAlign: 'top', width: '94px', height: '30px' }}></canvas>
                            </span>
                          </div>
                          <div class="col-md-6 col-sm-6 col-xs-6 tile">
                            <span>User trend</span>
                            <h2>$ 231,809</h2>
                            <span class="sparkline_one" style={{ height: '160px' }}>
                              <canvas width="200" height="60" style={{ display: 'inline-block', verticalAlign: 'top', width: '94px', height: '30px' }}></canvas>
                            </span>
                          </div>

                        </div>


                      </div>
                    </div>

                    <div class="x_panel">
                      <div class="x_title">
                        <h2>User Requests </h2>

                        <div class="clearfix"></div>
                      </div>
                      <div class="x_content">
                        DD/MM/YYY: Username, Time, details <br />
                        DD/MM/YYY: Username, Time, details

                    </div>
                    </div>

                    <div class="x_panel">
                      <div class="x_title">
                        <h2>Error Log </h2>

                        <div class="clearfix"></div>
                      </div>
                      <div class="x_content">
                        DD/MM/YYY: Time, details <br />
                        DD/MM/YYY: Time, details

                    </div>
                    </div>

                    <div class="x_panel">
                      <div class="x_title">
                        <h2>Tickets </h2>

                        <div class="clearfix"></div>
                      </div>
                      <div class="x_content">
                        DD/MM/YYY: Username, Time, details <br />
                        DD/MM/YYY: Username, Time, details

                    </div>
                    </div>


                  </div>

                  <div class="col-md-3">
                    <div class="x_panel">
                      <div class="x_title">
                        <h2>Compliance News </h2>

                        <div class="clearfix"></div>
                      </div>
                      <div class="x_content">
                        <article class="media event">
                          <a class="pull-left date">
                            <p class="month">Jan</p>
                            <p class="day">15</p>
                          </a>
                          <div class="media-body">
                            <a class="title" href="#">Item One Title</a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                        </article>
                        <article class="media event">
                          <a class="pull-left date">
                            <p class="month">Dec</p>
                            <p class="day">23</p>
                          </a>
                          <div class="media-body">
                            <a class="title" href="#">Item Two Title</a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                        </article>
                        <article class="media event">
                          <a class="pull-left date">
                            <p class="month">Dec</p>
                            <p class="day">16</p>
                          </a>
                          <div class="media-body">
                            <a class="title" href="#">Item Two Title</a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                        </article>
                        <article class="media event">
                          <a class="pull-left date">
                            <p class="month">Nov</p>
                            <p class="day">05</p>
                          </a>
                          <div class="media-body">
                            <a class="title" href="#">Item Two Title</a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                        </article>
                        <article class="media event">
                          <a class="pull-left date">
                            <p class="month">Oct</p>
                            <p class="day">19</p>
                          </a>
                          <div class="media-body">
                            <a class="title" href="#">Item Three Title</a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
            </div>

        );
    }
}

export default dashboardComponent;
