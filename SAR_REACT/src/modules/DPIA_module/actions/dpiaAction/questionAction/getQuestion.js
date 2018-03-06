import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "question"

        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "GET_ALL_QUESTION_SUCCESS",
                    getQuestionSuccess: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_ALL_QUESTION_SUCCESS", getQuestionFailure: error });
            });
    }
}