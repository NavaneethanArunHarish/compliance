import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "question_pro?sid="+id

        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "GET_QUES_BySECId_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_QUES_BySECId_REJECTED", getAllAssessmentErr: error });
            });
    }
}