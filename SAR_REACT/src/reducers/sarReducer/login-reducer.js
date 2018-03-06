export default (state = [], action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        signupSuccess: action.signup.data,
        error: null
      }
    case 'SIGNUP_REJECTED':

      return {
        ...state,
        signupRejected: action.signup.data,
        error: null
      }

    case 'REGISTER_SUCCESS':

      return {
        ...state,
        registerSuccess: action.register.data,
        error: null
      }
    case 'REGISTER_REJECTED':

      return {
        ...state,
        registerRejected: action.register.data,
        error: null
      }

    case 'GET_USER_BY_ID_SUCCESS':

      return {
        ...state,
        getUserSuccess: action.getUserByIdSuccess.data,
        error: null
      }

    case 'RESET_PASSWORD_SUCCESS':

      return {
        ...state,
        resetPasswordSuccess: action.resetPassword.data,
        error: null
      }

    case 'FORGET_PASSWORD_SUCCESS':

      return {
        ...state,
        forgetPasswordSuccess: action.forgetPasswordSuccess.data,
        error: null
      }

    case 'LOGOUT_SUCCESS':

      return {
        ...state,
        logoutSuccess: action.logoutSuccess.data,
        error: null
      }

    case 'CREATE_EX_USER_SUCCESS':

      return {
        ...state,
        externalUserSuccess: action.exUserSuccess.data,
        error: null
      }

    case 'GET_USER_SUCCESS':

      return {
        ...state,
        userSuccess: action.getUserSuccess.data,
        error: null
      }

    case 'EDIT_USER_SUCCESS':

      return {
        ...state,
        editUserSuccess: action.editUser.data,
        error: null
      }


    default:
      return state;
  }
};
