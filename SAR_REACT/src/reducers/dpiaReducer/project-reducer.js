export default (state = [], action) => {
    switch (action.type) {
        case 'PROJECT_CREATED':
            return {
                ...state,
                projectCreated: action.project_created.data,
                error: null
            }
            case 'PROJECT_UPDATED_SUCCESS':
            return {
                ...state,
                updateProject: action.updateProject.data,
                error: null
            }
            case 'GET_PROJECT_ID_SUCCESS':
            return {
                ...state,
                getProjectByIdSuccess: action.getProjectByIdSuccess.data,
                error: null
            }
        default:
            return state;
    }
};