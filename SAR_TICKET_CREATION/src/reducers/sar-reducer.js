export default (state = [], action) => {
    switch (action.type) {

        case 'CREATE_SAR_SUCCESS':
        return {
          ...state,
          createSar: action.sarSuccess.data,
          error: null
        }
        
        default:
        return state;
    }
}