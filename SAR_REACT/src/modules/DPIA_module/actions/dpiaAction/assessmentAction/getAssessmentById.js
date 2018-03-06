import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "assessment/"+id

        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "GET_ALL_ASSESSMENT_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_ALL_ASSESSMENT_REJECTED", getAllAssessmentErr: error });
            });
    }
}