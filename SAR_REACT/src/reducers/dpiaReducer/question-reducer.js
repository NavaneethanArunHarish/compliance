export default (state = [], action) => {
    switch (action.type) {
        case 'Question_CREATED':
            return {
                ...state,
                questionCreated: action.questionCreated.data,
                error: null
            }
            case 'GET_ALL_QUESTION_SUCCESS':
            return {
                ...state,
                getQuestionSuccess: action.getQuestionSuccess.data,
                error: null
            }
            case 'Question_UPDATED':
            return {
                ...state,
                questionUpdated: action.questionUpdated.data,
                error: null
            }
            case 'Question_BY_ID':
            return {
                ...state,
                questionByIdSuccess: action.questionByIdSuccess.data,
                error: null
            }
            case 'DELETE_QUESTION_SUCCESS':
            return {
                ...state,
                getAllQuestion: action.getAllQuestion.data,
                error: null
            }
        default:
            return state;
    }
};