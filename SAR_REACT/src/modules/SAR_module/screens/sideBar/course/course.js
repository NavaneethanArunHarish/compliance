import React, { Component } from 'react';
import '../../css/custom.css'
import '../../css/all.css'
import '../../css/custom.min.css'

class courseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Courses</h3>
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
                    <h2>Courses</h2>
                   
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <div class="col-xs-2">
                      <ul class="nav nav-tabs tabs-left">
                        <li class="active"><a href="#manage-courses" data-toggle="tab">Manage courses and categories</a>
                        </li>
                        <li><a href="#add-category" data-toggle="tab">Add a category</a>
                        </li>
                        <li><a href="#restore-course" data-toggle="tab">Restore course</a>
                        </li>
                        <li><a href="#course-default-settings" data-toggle="tab">Course default settings</a>
                        </li>
                        <li><a href="#course-request" data-toggle="tab">Course request</a>
                        </li>
                        <li><a href="#upload-courses" data-toggle="tab">Upload courses</a>
                        </li>

                      </ul>
                    </div>

                    <div class="col-xs-10">
                      <div class="tab-content">
                        <div class="tab-pane active" id="manage-courses">
                          <p class="lead">Course and category management</p>

                          <div role="main" id="yui_3_17_2_1_1516172620248_101"><span id="maincontent"></span><div class="coursecat-management-header clearfix" id="yui_3_17_2_1_1516172620248_100"><div><div class="view-mode-selector vms">Viewing: <div class="action-menu moodle-actionmenu view-mode-selector vms" id="action-menu-3" data-enhance="moodle-core-actionmenu">

        <div class="menubar" id="action-menu-3-menubar" role="menubar">

            <div class="dropdown d-inline">
    <a href="#" class="dropdown-toggle" id="dropdown-3" title="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Course categories and courses<b class="caret"></b></a>
        <ul class="dropdown-menu align-tr-br" id="action-menu-3-menu" data-rel="menu-content" aria-labelledby="action-menu-toggle-3" role="menu" data-align="tr-br">
            <li><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;view=combined" class="dropdown-item vms-mode menu-action" data-mode="combined" role="menuitem" aria-labelledby="actionmenuaction-8"><span class="menu-action-text" id="actionmenuaction-8">Course categories and courses</span></a></li>
            <li><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;view=categories" class="dropdown-item vms-mode menu-action" data-mode="categories" role="menuitem" aria-labelledby="actionmenuaction-9"><span class="menu-action-text" id="actionmenuaction-9">Course categories</span></a></li>
            <li><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;view=courses" class="dropdown-item vms-mode menu-action" data-mode="courses" role="menuitem" aria-labelledby="actionmenuaction-10"><span class="menu-action-text" id="actionmenuaction-10">Courses</span></a>
            </li>
        </ul>
</div>


        </div>

</div></div></div></div><form action="http://35.169.62.69/course/management.php?categoryid=1" method="POST" id="coursecat-management"><input type="hidden" name="sesskey" value="l7ZaRlWeWU"/><input type="hidden" name="action" value="bulkaction"/><div class="skiplinks accesshide"><a class="skip" href="http://35.169.62.69/course/management.php?categoryid=1#category-listing">Skip to the category listings</a><a class="skip" href="http://35.169.62.69/course/management.php?categoryid=1#course-listing">Skip to the course listings</a></div><div class="columns-2 viewmode-cobmined grid-row-r row-fluid" id="course-category-listings"><div class="grid-col-5-12 grid-col span5 col-md-5" id="category-listing"><div class="category-listing" id="yui_3_17_2_1_1516172620248_103"><h3 id="category-listing-title">Course categories</h3><div class="listing-actions category-listing-actions"><a href="http://35.169.62.69/course/editcategory.php?parent=1">Create new category</a></div><ul class="ml" style={{display: 'none'}} role="tree" aria-labelledby="category-listing-title" id="yui_3_17_2_1_1516172620248_66"><li class="listitem listitem-category" data-id="1" data-expandable="0" data-expanded="0" data-selected="1" data-visible="1" role="treeitem" aria-expanded="false"><div class="clearfix yui3-dd-drop" id="yui_3_17_2_1_1516172620248_67"><div class="float-left ba-checkbox"><input type="checkbox" name="bcat[]" value="1" class="bulk-action-checkbox" aria-label="Miscellaneous bulk action selection" data-action="select">&nbsp;</div><span class="float-left"><i class="icon fa fa-fw fa-fw tree-icon" aria-hidden="true" title="Show Miscellaneous" aria-label=""></i></span><a class="float-left categoryname" href="http://35.169.62.69/course/management.php?categoryid=1">Miscellaneous</a><div class="float-right"><div class="action-menu moodle-actionmenu category-item-actions item-actions" id="action-menu-4" data-enhance="moodle-core-actionmenu">

        <div class="menubar" id="action-menu-4-menubar" role="menubar">

                <a href="http://35.169.62.69/course/management.php?categoryid=1&amp;sesskey=l7ZaRlWeWU&amp;action=hidecategory" class="action-hide menu-action" data-action="hide" role="menuitem" title="Hide"><i class="icon fa fa-eye fa-fw " aria-hidden="true" title="Hide" aria-label="Hide"></i></a>





    <a href="http://35.169.62.69/course/management.php?categoryid=1&amp;sesskey=l7ZaRlWeWU&amp;action=showcategory" class="action-show menu-action" data-action="show" role="menuitem" title="Show"><i class="icon fa fa-eye-slash fa-fw " aria-hidden="true" title="Show" aria-label="Show"></i></a>





    <a href="http://35.169.62.69/course/management.php?categoryid=1&amp;sesskey=l7ZaRlWeWU&amp;action=movecategoryup" class="action-moveup menu-action" data-action="moveup" role="menuitem" title="Up"><i class="icon fa fa-arrow-up fa-fw " aria-hidden="true" title="Up" aria-label="Up"></i></a>





    <a href="http://35.169.62.69/course/management.php?categoryid=1&amp;sesskey=l7ZaRlWeWU&amp;action=movecategorydown" class="action-movedown menu-action" data-action="movedown" role="menuitem" title="Down"><i class="icon fa fa-arrow-down fa-fw " aria-hidden="true" title="Down" aria-label="Down"></i></a>





<div class="dropdown d-inline">
    <a href="#" class="dropdown-toggle" id="dropdown-4" title="Actions" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon fa fa-cog fa-fw " aria-hidden="true" aria-label=""></i></a>
        <div class="dropdown-menu dropdown-menu-right menu align-tr-br" id="action-menu-4-menu" data-rel="menu-content" aria-labelledby="action-menu-toggle-4" role="menu" data-align="tr-br">
            <a href="http://35.169.62.69/course/editcategory.php?id=1" class="dropdown-item action-edit menu-action" data-action="edit" role="menuitem" aria-labelledby="actionmenuaction-5"><i class="icon fa fa-cog fa-fw " aria-hidden="true" title="Edit" aria-label="Edit"></i><span class="menu-action-text" id="actionmenuaction-5">Edit</span></a><a href="http://35.169.62.69/course/editcategory.php?parent=1" class="dropdown-item action-createnewsubcategory menu-action" data-action="createnewsubcategory" role="menuitem" aria-labelledby="actionmenuaction-6"><i class="icon fa fa-plus-square fa-fw " aria-hidden="true" title="Create new subcategory" aria-label="Create new subcategory"></i><span class="menu-action-text" id="actionmenuaction-6">Create new subcategory</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;sesskey=l7ZaRlWeWU&amp;action=deletecategory" class="dropdown-item action-delete menu-action" data-action="delete" role="menuitem" aria-labelledby="actionmenuaction-7"><i class="icon fa fa-trash fa-fw " aria-hidden="true" title="Delete" aria-label="Delete"></i><span class="menu-action-text" id="actionmenuaction-7">Delete</span></a><a href="http://35.169.62.69/admin/roles/assign.php?contextid=3&amp;returnurl=%2Fcourse%2Fmanagement.php%3Fcategoryid%3D1" class="dropdown-item action-assignroles menu-action" data-action="assignroles" role="menuitem" aria-labelledby="actionmenuaction-8"><i class="icon fa fa-user-circle fa-fw " aria-hidden="true" title="Assign roles" aria-label="Assign roles"></i><span class="menu-action-text" id="actionmenuaction-8">Assign roles</span></a><a href="http://35.169.62.69/admin/roles/permissions.php?contextid=3&amp;returnurl=%2Fcourse%2Fmanagement.php%3Fcategoryid%3D1" class="dropdown-item action-permissions menu-action" data-action="permissions" role="menuitem" aria-labelledby="actionmenuaction-9"><i class="icon fa fa-pencil-square-o fa-fw " aria-hidden="true" title="Permissions" aria-label="Permissions"></i><span class="menu-action-text" id="actionmenuaction-9">Permissions</span></a><a href="http://35.169.62.69/admin/roles/check.php?contextid=3&amp;returnurl=%2Fcourse%2Fmanagement.php%3Fcategoryid%3D1" class="dropdown-item action-checkroles menu-action" data-action="checkroles" role="menuitem" aria-labelledby="actionmenuaction-10"><i class="icon fa fa-unlock-alt fa-fw " aria-hidden="true" title="Check permissions" aria-label="Check permissions"></i><span class="menu-action-text" id="actionmenuaction-10">Check permissions</span></a><a href="http://35.169.62.69/cohort/index.php?contextid=3" class="dropdown-item action-cohorts menu-action" data-action="cohorts" role="menuitem" aria-labelledby="actionmenuaction-11"><i class="icon fa fa-users fa-fw " aria-hidden="true" title="Cohorts" aria-label="Cohorts"></i><span class="menu-action-text" id="actionmenuaction-11">Cohorts</span></a><a href="http://35.169.62.69/filter/manage.php?contextid=3&amp;return=management" class="dropdown-item action-filters menu-action" data-action="filters" role="menuitem" aria-labelledby="actionmenuaction-12"><i class="icon fa fa-filter fa-fw " aria-hidden="true" title="Filters" aria-label="Filters"></i><span class="menu-action-text" id="actionmenuaction-12">Filters</span></a><a href="http://35.169.62.69/backup/restorefile.php?contextid=3" class="dropdown-item action-restore menu-action" data-action="restore" role="menuitem" aria-labelledby="actionmenuaction-13"><i class="icon fa fa-level-up fa-fw " aria-hidden="true" title="Restore course" aria-label="Restore course"></i><span class="menu-action-text" id="actionmenuaction-13">Restore course</span></a>
        </div>
</div>


        </div>

</div><span class="course-count dimmed" aria-labelledby="course-count-1"><span>0</span><span class="accesshide" id="course-count-1">Courses</span><img class="icon " alt="Courses" title="Courses" src="http://35.169.62.69/theme/image.php/boost/core/1515494561/i/course"/></span></div></div></li></ul><div class="category-bulk-actions bulk-actions" style={{display: 'block'}}><div class="accesshide" tabindex="0">Bulk actions for selected categories</div><div class="detail-pair row yui3-g m-y-1"><div class="pair-key span3 col-md-3 yui3-u-1-4"><span>Sorting</span></div><div class="pair-value span9 col-md-9 yui3-u-3-4"><div><input type="hidden" name="currentcategoryid" value="1"/><div><select aria-label="Which categories would you like to sort?" id="menuselectsortby" class="select custom-select form-control menuselectsortby" name="selectsortby"><option value="thiscategory">This category</option><option selected="selected" value="selectedcategories">Selected categories</option><option value="allcategories">All categories</option></select></div><div><select aria-label="Select how you would like to sort categories" class="select custom-select form-control m-t-1" id="menuresortcategoriesby" name="resortcategoriesby" disabled="true"><option selected="selected" value="name">Sort by Category name ascending</option><option value="namedesc">Sort by Category name descending</option><option value="idnumber">Sort by Category ID number ascending</option><option value="idnumberdesc">Sort by Category ID number descending</option><option value="none">Don't sort categories</option></select></div><div><select aria-label="Select how you would like to sort courses" class="select custom-select form-control m-t-1" id="menuresortcoursesby" name="resortcoursesby" disabled="true"><option selected="selected" value="fullname">Sort by Course full name ascending</option><option value="fullnamedesc">Sort by Course full name descending</option><option value="shortname">Sort by Course short name ascending</option><option value="shortnamedesc">Sort by Course short name descending</option><option value="idnumber">Sort by Course ID number ascending</option><option value="idnumberdesc">Sort by Course ID number descending</option><option value="timecreated">Sort by Course time created ascending</option><option value="timecreateddesc">Sort by Course time created descending</option><option value="none">Don't sort courses</option></select></div><input type="submit" name="bulksort" value="Sort" class="btn btn-secondary m-y-1"/></div></div></div><div class="detail-pair row yui3-g "><div class="pair-key span3 col-md-3 yui3-u-1-4"><span><span id="moveselectedcategoriesto">Move selected categories to</span></span></div><div class="pair-value span9 col-md-9 m-b-1 yui3-u-3-4"><span><select aria-labelledby="moveselectedcategoriesto" class="select custom-select form-control m-r-1" id="menumovecategoriesto" name="movecategoriesto" disabled="true"><option selected="selected" value="">Choose...</option><option value="0">Top</option><option value="1">Miscellaneous</option></select><input type="submit" name="bulkmovecategories" value="Move" class="btn btn-secondary"/></span></div></div></div></div></div><div class="grid-col-7-12 grid-col span7 col-md-7" id="course-listing"><div class="course-listing" data-category="1" data-page="-1" data-totalpages="0" data-totalcourses="0" data-canmoveoutof="1" id="yui_3_17_2_1_1516172620248_57"><h3 id="course-listing-title" tabindex="0">Miscellaneous</h3><div class="listing-actions course-listing-actions"><a href="http://35.169.62.69/course/edit.php?category=1&amp;returnto=catmanage">Create new course</a> | <div class="action-menu moodle-actionmenu" id="action-menu-5" data-enhance="moodle-core-actionmenu">

        <div class="menubar" id="action-menu-5-menubar" role="menubar">

            <div class="dropdown d-inline">
    <a href="#" class="dropdown-toggle" id="dropdown-5" title="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort courses<b class="caret"></b></a>
        <div class="dropdown-menu dropdown-menu-right menu align-tr-br" id="action-menu-5-menu" data-rel="menu-content" aria-labelledby="action-menu-toggle-5" role="menu" data-align="tr-br">
            <a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=fullname" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-11"><span class="menu-action-text" id="actionmenuaction-11">Sort by Course full name ascending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=fullnamedesc" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-12"><span class="menu-action-text" id="actionmenuaction-12">Sort by Course full name descending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=shortname" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-13"><span class="menu-action-text" id="actionmenuaction-13">Sort by Course short name ascending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=shortnamedesc" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-14"><span class="menu-action-text" id="actionmenuaction-14">Sort by Course short name descending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=idnumber" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-15"><span class="menu-action-text" id="actionmenuaction-15">Sort by Course ID number ascending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=idnumberdesc" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-16"><span class="menu-action-text" id="actionmenuaction-16">Sort by Course ID number descending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=timecreated" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-17"><span class="menu-action-text" id="actionmenuaction-17">Sort by Course time created ascending</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;action=resortcourses&amp;sesskey=l7ZaRlWeWU&amp;resort=timecreateddesc" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-18"><span class="menu-action-text" id="actionmenuaction-18">Sort by Course time created descending</span></a>
        </div>
</div>


        </div>

</div> | <div class="action-menu moodle-actionmenu courses-per-page" id="action-menu-6" data-enhance="moodle-core-actionmenu">

        <div class="menubar" id="action-menu-6-menubar" role="menubar">

            <div class="dropdown d-inline">
    <a href="#" class="dropdown-toggle" id="dropdown-6" title="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Per page: 20<b class="caret"></b></a>
        <div class="dropdown-menu dropdown-menu-right menu align-tr-br" id="action-menu-6-menu" data-rel="menu-content" aria-labelledby="action-menu-toggle-6" role="menu" data-align="tr-br">
            <a href="http://35.169.62.69/course/management.php?categoryid=1&amp;perpage=5" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-19"><span class="menu-action-text" id="actionmenuaction-19">5</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;perpage=10" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-20"><span class="menu-action-text" id="actionmenuaction-20">10</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;perpage=20" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-21"><span class="menu-action-text" id="actionmenuaction-21">20</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;perpage=50" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-22"><span class="menu-action-text" id="actionmenuaction-22">50</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;perpage=100" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-23"><span class="menu-action-text" id="actionmenuaction-23">100</span></a><a href="http://35.169.62.69/course/management.php?categoryid=1&amp;perpage=999" class="dropdown-item menu-action" role="menuitem" aria-labelledby="actionmenuaction-24"><span class="menu-action-text" id="actionmenuaction-24">All</span></a>
        </div>
</div>


        </div>

</div></div><ul class="ml yui3-dd-drop" role="group" id="yui_3_17_2_1_1516172620248_60"></ul><div class="listing-pagination-totals dimmed">No courses in this category</div><div class="course-bulk-actions bulk-actions"><div class="accesshide" tabindex="0">Bulk actions for selected courses</div><div class="detail-pair row yui3-g "><div class="pair-key span3 col-md-3 yui3-u-1-4"><span><span id="moveselectedcoursesto">Move selected courses to...</span></span></div><div class="pair-value span9 col-md-9 m-b-1 yui3-u-3-4"><span><select aria-labelledby="moveselectedcoursesto" class="select custom-select form-control m-r-1" id="menumovecoursesto" name="movecoursesto" disabled="true"><option selected="selected" value="">Choose...</option><option value="1">Miscellaneous</option></select><input type="submit" name="bulkmovecourses" value="Move" class="btn btn-secondary"/></span></div></div></div></div></div></div></form><form id="coursesearch" action="http://35.169.62.69/course/management.php" method="get" class="form-inline"><fieldset class="coursesearchbox invisiblefieldset m-y-1"><label for="coursesearchbox">Search courses</label><input type="text" id="coursesearchbox" size="30" name="search" value="" class="form-control m-x-1"/><input type="submit" value="Go" class="btn btn-secondary"/></fieldset></form></div>


                         
                        </div>
                        <div class="tab-pane" id="add-category">
                          <p class="lead">Add a category</p>

                          <form autocomplete="off" action="http://35.169.62.69/course/editcategory.php" method="post" accept-charset="utf-8" id="mform1" class="mform">
  <div style={{display: 'none'}}><input name="id" type="hidden" value="0"/>
<input name="sesskey" type="hidden" value="l7ZaRlWeWU"/>
<input name="_qf__core_course_editcategory_form" type="hidden" value="1"/>
</div>

<div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-xs-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="id_parent">
            Parent category
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="select">
        <select class="custom-select" name="parent" id="id_parent">
            <option value="0" selected="">Top</option>
            <option value="1">Miscellaneous</option>
        </select>
        <div class="form-control-feedback" id="id_error_parent" style={{display: none}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-xs-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            
        </span>
        <label class="col-form-label d-inline " for="id_name">
            Category name
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="text">
        <input type="text" class="form-control " name="name" id="id_name" value="" size="30"/>
        <div class="form-control-feedback" id="id_error_name" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-xs-right text-nowrap">
            
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>The ID number of a course category  is only used when matching the category against external systems and is not displayed anywhere on the site. If the category has an official code name it may be entered, otherwise the field can be left blank.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Category ID number" aria-label="Help with Category ID number"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="id_idnumber">
            Category ID number
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="text">
        <input type="text" class="form-control " name="idnumber" id="id_idnumber" value="" size="10" maxlength="100"/>
        <div class="form-control-feedback" id="id_error_idnumber" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   " id="yui_3_17_2_1_1516177050080_334">
    <div class="col-md-3">
        <span class="pull-xs-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="id_description_editor" id="yui_3_17_2_1_1516177050080_74">
            Description
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="editor" id="yui_3_17_2_1_1516177050080_333">
         <div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor-one">
                    <div class="btn-group">
                      <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>
                      <ul class="dropdown-menu">
                      </ul>
                    </div>

                    <div class="btn-group">
                      <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>
                      <ul class="dropdown-menu">
                        <li>
                          <a data-edit="fontSize 5">
                            <p style={{fontSize:'17px'}}>Huge</p>
                          </a>
                        </li>
                        <li>
                          <a data-edit="fontSize 3">
                            <p style={{fontSize:'14px'}}>Normal</p>
                          </a>
                        </li>
                        <li>
                          <a data-edit="fontSize 1">
                            <p style={{fontSize:'11px'}}>Small</p>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="btn-group">
                      <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>
                      <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>
                      <a class="btn" data-edit="strikethrough" title="Strikethrough"><i class="fa fa-strikethrough"></i></a>
                      <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>
                    </div>

                    <div class="btn-group">
                      <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="fa fa-list-ul"></i></a>
                      <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="fa fa-list-ol"></i></a>
                      <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="fa fa-dedent"></i></a>
                      <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="fa fa-indent"></i></a>
                    </div>

                    <div class="btn-group">
                      <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>
                      <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i class="fa fa-align-center"></i></a>
                      <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>
                      <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i class="fa fa-align-justify"></i></a>
                    </div>

                    <div class="btn-group">
                      <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i class="fa fa-link"></i></a>
                      <div class="dropdown-menu input-append">
                        <input class="span2" placeholder="URL" type="text" data-edit="createLink" />
                        <button class="btn" type="button">Add</button>
                      </div>
                      <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="fa fa-cut"></i></a>
                    </div>

                    <div class="btn-group">
                      <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i></a>
                      <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />
                    </div>

                    <div class="btn-group">
                      <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>
                      <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>
                    </div>
                  </div>

                  <div id="editor-one" class="editor-wrapper"></div>

                  <textarea name="descr" id="descr" style={{display:'none'}}></textarea>
                  
                  <br />

                  <div class="ln_solid"></div>
        <div class="form-control-feedback" id="id_error_description_editor" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem femptylabel  " data-groupname="buttonar">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="fgroup_id_buttonar">
            
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="group">
            
            <div class="form-group  fitem  ">
    <label class="col-form-label " for="id_submitbutton">
         
        
        
    </label>
    <span data-fieldtype="submit">
        <input type="submit" class="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Create category"/>
    </span>
    <div class="form-control-feedback" id="id_error_submitbutton" style={{display: 'none'}}>
        
    </div>
</div>
             
            <div class="form-group  fitem   btn-cancel">
    <label class="col-form-label " for="id_cancel">
         
        
        
    </label>
    <span data-fieldtype="submit">
        <input type="submit" class="btn btn-secondary" name="cancel" id="id_cancel" value="Cancel" onclick="skipClientValidation = true; return true;"/>
    </span>
    <div class="form-control-feedback" id="id_error_cancel" style={{display: 'none'}}>
        
    </div>
</div>
        <div class="form-control-feedback" id="id_error_" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    <div class="fdescription required">There are required fields in this form marked <i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required field" aria-label="Required field"></i>.</div>
</form>

                        </div>
                        <div class="tab-pane" id="restore-course">
                          <p class="lead">Restore course</p>

                        </div>
                        <div class="tab-pane" id="course-default-settings">
                          <p class="lead">Course default settings</p>

                        </div>
                        <div class="tab-pane" id="course-request">
                          <p class="lead">Course request</p>

                        </div>
                        <div class="tab-pane" id="upload-courses">
                          <p class="lead">Upload courses</p>

                        </div>
                      </div>
                    </div>

                    <div class="clearfix"></div>

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

export default courseComponent;
