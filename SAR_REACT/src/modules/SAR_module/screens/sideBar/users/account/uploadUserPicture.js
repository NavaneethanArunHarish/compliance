import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'

export default class UploadUserPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="upload-user-pictures">
                        <p className="lead">Upload user pictures</p>
                        <form autoComplete="off" action="http://35.169.62.69/admin/tool/uploaduser/picture.php" method="post" acceptCharset="utf-8" id="mform1" className="mform">
                            <div style={{ display: "none" }}><input name="sesskey" type="hidden" value="cAo3cH4bjA" />
                                <input name="_qf__admin_uploadpicture_form" type="hidden" value="1" />
                                <input name="mform_isexpanded_id_settingsheader" type="hidden" value="1" />
                            </div>


                            <fieldset className="clearfix collapsible" id="id_settingsheader">

                                <div className="fcontainer clearfix">
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                                <abbr className="initialism text-danger" title="Required"><i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>


                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_userpicturesfile">
                                                File
</label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="filepicker">
                                            <div className="filemanager-loading mdl-align" id="filepicker-loading-5a5dfe0723615" style={{ display: "none" }}>
                                                <i className="icon fa fa-circle-o-notch fa-spin fa-fw " aria-hidden="true" title="Loading..." aria-label="Loading..."></i>
                                            </div>
                                            <div id="filepicker-wrapper-5a5dfe0723615" className="mdl-left" >
                                                <div>
                                                    <input type="button" className="btn btn-secondary fp-btn-choose" id="filepicker-button-5a5dfe0723615" value="Choose a file..." name="userpicturesfilechoose" />
                                                    <span>  </span>
                                                </div>    <div id="file_info_5a5dfe0723615" className="mdl-left filepicker-filelist" style={{ position: "relative" }}>
                                                    <div className="filepicker-filename">
                                                        <div className="filepicker-container"><div className="dndupload-message">You can drag and drop files here to add them. <br /><div className="dndupload-arrow"></div></div></div>
                                                        <div className="dndupload-progressbars"></div>
                                                    </div>
                                                    <div><div className="dndupload-target">Drop files here to upload<br /><div className="dndupload-arrow"></div></div></div>
                                                </div></div><input type="hidden" name="userpicturesfile" id="id_userpicturesfile" value="48595757" className="filepickerhidden" />
                                            {/* <noscript>
                                                                &lt;div&gt;&lt;object type='text/html' data='http://35.169.62.69/repository/draftfiles_manager.php?env=filepicker&amp;amp;action=browse&amp;amp;itemid=48595757&amp;amp;subdirs=0&amp;amp;maxbytes=-1&amp;amp;maxfiles=1&amp;amp;ctx_id=1&amp;amp;course=1&amp;amp;sesskey=cAo3cH4bjA' height='160' width='600' style={{border:'1px solid #000'}}&gt;&lt;/object&gt;&lt;/div&gt;
                                                            </noscript> */}
                                            <p>Accepted file types:</p><div className="form-filetypes-descriptions">
                                                <ul className="list-unstyled unstyled">
                                                    <li>application/x-digidoc <small className="text-muted muted">.bdoc .cdoc .ddoc</small></li>
                                                    <li>Archive (7Z) <small className="text-muted muted">.7z</small></li>
                                                    <li>Archive (GTAR) <small className="text-muted muted">.gtar</small></li>
                                                    <li>Archive (GZ) <small className="text-muted muted">.gz</small></li>
                                                    <li>Archive (GZIP) <small className="text-muted muted">.gzip</small></li>
                                                    <li>Archive (HQX) <small className="text-muted muted">.hqx</small></li>
                                                    <li>Archive (RAR) <small className="text-muted muted">.rar</small></li>
                                                    <li>Archive (SIT) <small className="text-muted muted">.sit</small></li>
                                                    <li>Archive (TAR) <small className="text-muted muted">.tar</small></li>
                                                    <li>Archive (TGZ) <small className="text-muted muted">.tgz</small></li>
                                                    <li>Archive (ZIP) <small className="text-muted muted">.zip</small></li>
                                                </ul>
                                            </div>
                                            <div className="form-control-feedback" id="id_error_userpicturesfile" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div><div className="form-group row  fitem">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_userfield">
                                                User attribute to use to match pictures:</label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <select className="custom-select form-control" name="userfield" id="id_userfield">
                                                <option value="0">username</option>
                                                <option value="1">idnumber</option>
                                                <option value="2">id</option>
                                            </select>
                                            <div className="form-control-feedback" id="id_error_userfield" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div><div className="form-group row  fitem">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">



                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_overwritepicture">
                                                Overwrite existing user pictures?
</label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <select className="custom-select form-control " name="overwritepicture" id="id_overwritepicture">
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                            </select>
                                            <div className="form-control-feedback" id="id_error_overwritepicture" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset><div className="form-group row  fitem femptylabel  ">
                                <div className="col-md-3">
                                    <span className="pull-right text-nowrap">



                                    </span>
                                    <label className="col-form-label d-inline " htmlFor="id_submitbutton">

                                    </label>
                                </div>
                                <div className="col-md-9 form-inline felement" data-fieldtype="submit">
                                    <input type="submit" className="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Upload user pictures" />
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