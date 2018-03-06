import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (data, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.DPIARestUrl+'assignassmt',
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        })
        .then(response => {
            var data = response;
            callback(data);
            dispatch({
                type: "ASSESSMENT_ASSIGNED_SUCCESS",
                ass_created: data
            });
        }).catch(error => {
            callback(error);
            dispatch({ type: "ASSESSMENT_ASSIGNED_ERROR", ass_error: error });
        });
    }
}