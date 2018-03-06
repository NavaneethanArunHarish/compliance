export default (state = [], action) => {
  switch (action.type) {
    case 'GET_SAR_SUCCESS':
      return {
        ...state,
        sarSuccess: action.getSarSuccess.data,
        error: null
      }

    case 'GET_SAR_BY_ID_SUCCESS':

      return {
        ...state,
        getSarSuccess: action.getSarByIdSuccess.data,
        error: null
      }

    case 'GET_TICKET_BY_ID':
      return {
        ...state,
        getticketbyid: action.getticketbyid.data,
        error: null
      }

    case 'CREATE_SAR_SUCCESS':
      return {
        ...state,
        createSar: action.sarSuccess.data,
        error: null
      }


    case 'CREATE_TICKET':
      return {
        ...state,
        create_ticket: action.create_ticket.data,
        error: null
      }

    case 'CREATE_TICKET_INFO':
      return {
        ...state,
        create_ticket_info: action.create_ticket_info.data,
        error: null
      }

    case 'INITIAL_PAGE':
      return {
        ...state,
        initail_page: action.initail_page.data,
        error: null
      }

    case 'DEPARTMENT':
      return {
        ...state,
        department: action.department.data,
        error: null
      }

    case 'CLOSE_SAR':
      return {
        ...state,
        close_sar: action.close_sar.data,
        error: null
      }

    case 'GET_SAR_BY_USER_ID_SUCCESS':

      return {
        ...state,
        getSarDetails: action.getSarByUserIdSuccess.data,
        error: null
      }

    case 'GET_TICKET_BY_SAR_ID_SUCCESS':

      return {
        ...state,
        getTicketDetails: action.getTicketBySarIdSuccess.data,
        error: null
      }

    case 'GET_TICKET_INFO_BY_SAR_ID_SUCCESS':

      return {
        ...state,
        getTicketDetails: action.getTicketInfoBySarIdSuccess.data,
        error: null
      }

    case 'GET_RESPONSE_BY_SAR_BY_ID_SUCCESS':

      return {
        ...state,
        getResponseSarSuccess: action.getResponseSarSuccess.data,
        error: null
      }

    case 'GET_SAR_BY_EXUSER_SUCCESS':

      return {
        ...state,
        getSarExUserSuccess: action.getSarExUserSuccess.data,
        error: null
      }

      case 'CREATE_NEW_SAR_SUCCESS':

      return {
        ...state,
        createNewSAR: action.createNewSAR.data,
        error: null
      }

      case 'GET_SAR_BY_REP_SUCCESS':
      
            return {
              ...state,
              getSarRepSuccess: action.getSarRepSuccess.data,
              error: null
            }

    default:
      return state;
  }
};