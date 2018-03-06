import signUp from './signup';
import register from './login';
import getSar from './getSar';
import forgetPassword from './forgetPassword';
import resetPassword from './resetPassword';
import getSarById from './getSarById';
import getUserById from './getUserById';
import createSar from './createSar';
import getSarByUserId from './getSarByUserId';
import logout from './logout';
import getTicketBySarId from './getTicketBySarId';
import getSarByPageId from './getSarByPgaeID';
import close_sar from './close_sar';
import exUser from './createExUser';
import getallUser from './getallUser'
import initialpage from './initialpage';
import getalldepartment from './getalldepartment';
import create_ticket from './create_ticket';
import create_ticket_info from  './create_ticket_info';
import getPaymentPlans from './getPayment_plans';
import license from './license';
import editUser from './editUser';
import AssignSar from './assignSar';
import getTicketInfoBySarId from './getTicketInfoBySarId';
import getUserByType from './getUserByType';
import AmountPaind from './paid';
import getPageCount from './getPageCount';
import reopen_sar from './reopen_sar';
import getResponseById from './getResponseById';
import searchSar from './searchSar';
import getDepartmentById from './getDepartmentById';
import geticketbyid from './geticketbyid';  
import getSarByRep from './getSarByRep';
import changeSarPriority from './changeSarPriority';
import getSarHistory from './getSarHistory';
import getSarImages from './getSarImages';
import updateUserType from './updateUserType';
import AddResponse from './addResponse';
import ImageUpload from './fileUpload';
import escalated from './escalated';
import getEscalationCount from './getEscalationCount';
import getSarByUserIdPage from './getSarDetailsByUserIdPag';
import getSarbyExUserName from './getSarbyExUserName';
import createNewSar from './createNewSar';
import getSarByRepName from './getSarByRepName';
import getSarbyAssignedTo from './getSarbyAssignedTo';

export default {
    signUp,
    register,
    getSar,
    forgetPassword,
    resetPassword,
    getSarById,
    getUserById,
    createSar,
    getSarByPageId,
    getSarByUserId,
    logout,
    getTicketBySarId,
    close_sar,
    exUser,
    getallUser,
    initialpage,
    getalldepartment,
    create_ticket,
    create_ticket_info,
    getPaymentPlans,
    license,
    editUser,
    AssignSar,
    getTicketInfoBySarId,
    getUserByType,
    AmountPaind,
    getPageCount,
    reopen_sar,
    getResponseById,
    searchSar,
    getDepartmentById,
    geticketbyid,
    getSarByRep,
    changeSarPriority,
    getSarHistory,
    getSarImages,
    updateUserType,
    AddResponse,
    ImageUpload,
    escalated,
    getEscalationCount,
    getSarByUserIdPage,
    getSarbyExUserName,
    createNewSar,
    getSarByRepName,
    getSarbyAssignedTo
}
