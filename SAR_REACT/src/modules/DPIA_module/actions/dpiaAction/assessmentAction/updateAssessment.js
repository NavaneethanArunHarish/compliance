import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, data, callback) => {
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.DPIARestUrl + "assessment/" + id,
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "UPDATE_ASSESS_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "UPDATE_ASSESS_REJECTED", getAllAssessmentErr: error });
            });
    }
}