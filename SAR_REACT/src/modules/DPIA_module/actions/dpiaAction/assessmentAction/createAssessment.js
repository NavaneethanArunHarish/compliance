import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (data, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.DPIARestUrl+'assessment',
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        })
        .then(response => {
            var data = response;
            callback(data);
            dispatch({
                type: "ASSESSMENT_CREATED",
                ass_created: data
            });
        }).catch(error => {
            callback(error);
            dispatch({ type: "ASSESSMENT_CREATED_ERROR", ass_error: error });
        });
    }
}