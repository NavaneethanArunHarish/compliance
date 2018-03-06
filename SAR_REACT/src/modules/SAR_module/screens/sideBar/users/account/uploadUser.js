import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'

export default class UploadUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

    }
    render() {
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="upload-users">
                        <p className="lead">Upload users</p>

                        <form autoComplete="off" action="http://35.169.62.69/admin/tool/uploaduser/index.php" method="post" acceptCharset="utf-8" id="mform1" className="mform">
                            <div style={{ display: "none" }}><input name="sesskey" type="hidden" value="cAo3cH4bjA" />
                                <input name="_qf__admin_uploaduser_form1" type="hidden" value="1" />
                                <input name="mform_isexpanded_id_settingsheader" type="hidden" value="1" />
                            </div>


                            <fieldset className="clearfix collapsible" id="id_settingsheader">

                                <div className="fcontainer clearfix">
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                                <abbr className="initialism text-danger" title="Required"><i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>


                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_userfile">
                                                File
</label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="filepicker">
                                            <div className="filemanager-loading mdl-align" id="filepicker-loading-5a5dfbd9b1982" style={{ display: "none" }}>
                                                <i className="icon fa fa-circle-o-notch fa-spin fa-fw " aria-hidden="true" title="Loading..." aria-label="Loading..."></i>
                                            </div>
                                            <div id="filepicker-wrapper-5a5dfbd9b1982" className="mdl-left">
                                                <div>
                                                    <input type="button" className="btn btn-secondary fp-btn-choose" id="filepicker-button-5a5dfbd9b1982" value="Choose a file..." name="userfilechoose" />
                                                    <span>  </span>
                                                </div>    <div id="file_info_5a5dfbd9b1982" className="mdl-left filepicker-filelist" style={{ position: "relative" }}>
                                                    <div className="filepicker-filename">
                                                        <div className="filepicker-container"><div className="dndupload-message">You can drag and drop files here to add them. <br /><div className="dndupload-arrow"></div></div></div>
                                                        <div className="dndupload-progressbars"></div>
                                                    </div>
                                                    <div><div className="dndupload-target">Drop files here to upload<br /><div className="dndupload-arrow"></div></div></div>
                                                </div></div>
                                            <input type="hidden" name="userfile" id="id_userfile" value="142031099" className="filepickerhidden" />
                                            {/* <noscript>
                                            &lt;div&gt;&lt; object type='text/html' data='http://35.169.62.69/repository/draftfiles_manager.php?env=filepicker&amp;amp;action=browse&amp;amp;itemid=142031099&amp;amp;subdirs=0&amp;amp;maxbytes=-1&amp;amp;maxfiles=1&amp;amp;ctx_id=1&amp;amp;course=1&amp;amp;sesskey=cAo3cH4bjA' height='160' width='600' border:'1px solid #000 '&gt;&lt;/object&gt;&lt;/div&gt;
                                            </noscript> */}
                                            <div className="form-control-feedback" id="id_error_userfile" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div><div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">

                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_delimiter_name">
                                                CSV delimiter
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <select className="custom-select form-control" name="delimiter_name" id="id_delimiter_name" >
                                                <option value="comma" >,</option>
                                                <option value="semicolon">;</option>
                                                <option value="colon">:</option>
                                                <option value="tab">\t</option>
                                            </select>
                                            <div className="form-control-feedback" id="id_error_delimiter_name" style={{ display: " none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_encoding">
                                                Encoding
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <select className="custom-select form-control" name="encoding" id="id_encoding">
                                                <option value="UTF-8" >UTF-8</option>
                                                <option value="ISO-8859-1">ISO-8859-1</option>
                                                <option value="ASCII">ASCII</option>
                                                <option value="ISO-8859-2">ISO-8859-2</option>
                                                <option value="ISO-8859-3">ISO-8859-3</option>
                                                <option value="ISO-8859-4">ISO-8859-4</option>
                                                <option value="ISO-8859-5">ISO-8859-5</option>
                                                <option value="ISO-8859-6">ISO-8859-6</option>
                                                <option value="ISO-8859-7">ISO-8859-7</option>
                                                <option value="ISO-8859-8">ISO-8859-8</option>
                                                <option value="ISO-8859-9">ISO-8859-9</option>
                                                <option value="ISO-8859-10">ISO-8859-10</option>
                                                <option value="ISO-8859-13">ISO-8859-13</option>
                                                <option value="ISO-8859-14">ISO-8859-14</option>
                                                <option value="ISO-8859-15">ISO-8859-15</option>
                                                <option value="ISO-8859-11">ISO-8859-11</option>
                                                <option value="WINDOWS-874">WINDOWS-874</option>
                                                <option value="WINDOWS-1250">WINDOWS-1250</option>
                                                <option value="WINDOWS-1251">WINDOWS-1251</option>
                                                <option value="WINDOWS-1252">WINDOWS-1252</option>
                                                <option value="WINDOWS-1253">WINDOWS-1253</option>
                                                <option value="WINDOWS-1254">WINDOWS-1254</option>
                                                <option value="WINDOWS-1255">WINDOWS-1255</option>
                                                <option value="WINDOWS-1256">WINDOWS-1256</option>
                                                <option value="WINDOWS-1257">WINDOWS-1257</option>
                                                <option value="WINDOWS-1258">WINDOWS-1258</option>
                                                <option value="KOI-8R">KOI-8R</option>
                                                <option value="MACROMAN">MACROMAN</option>
                                                <option value="GB2312">GB2312</option>
                                                <option value="BIG5">BIG5</option>
                                                <option value="EUC-JP">EUC-JP</option>
                                                <option value="SHIFT_JIS">SHIFT_JIS</option>
                                                <option value="EUC-KR">EUC-KR</option>
                                                <option value="UTF-7">UTF-7</option>
                                                <option value="UTF-16">UTF-16</option>
                                                <option value="UTF-32">UTF-32</option>
                                                <option value="UCS-2">UCS-2</option>
                                                <option value="UCS-4">UCS-4</option>
                                            </select>
                                            <div className="form-control-feedback" id="id_error_encoding" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div><div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_previewrows">
                                                Preview rows
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <select className="custom-select form-control " name="previewrows" id="id_previewrows">
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="100">100</option>
                                                <option value="1000">1000</option>
                                                <option value="100000">100000</option>
                                            </select>
                                            <div className="form-control-feedback" id="id_error_previewrows" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                </div></fieldset><div className="form-group row  fitem femptylabel  ">
                                <div className="col-md-3">
                                    <span className="pull-right text-nowrap">

                                    </span>
                                    <label className="col-form-label d-inline " htmlFor="id_submitbutton">

                                    </label>
                                </div>
                                <div className="col-md-9 form-inline felement" data-fieldtype="submit">
                                    <input type="submit" className="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Upload users" />
                                    <div className="form-control-feedback" id="id_error_submitbutton" style={{ display: "none" }}>

                                    </div>
                                </div>
                            </div>
                            <div className="fdescription required">There are required fields in this form marked <i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required field" aria-label="Required field"></i>.</div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
