import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "assessment"

        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "GET_ALL_ASSESSMENT_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                dispatch({ type: "GET_ALL_ASSESSMENT_REJECTED", getAllAssessmentErr: error });
            });
    }
}