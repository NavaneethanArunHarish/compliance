import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (data, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.DPIARestUrl+'section',
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        })
        .then(response => {
            var data = response;
            callback(data);
            dispatch({
                type: "SECTION_CREATED",
                ass_created: data
            });
        }).catch(error => {
            callback(error);
            dispatch({ type: "SECTION_CREATED_ERROR", ass_error: error });
        });
    }
}