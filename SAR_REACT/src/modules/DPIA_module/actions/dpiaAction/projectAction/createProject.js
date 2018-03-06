import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (data, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.DPIARestUrl+'projects',
            headers: {
                'Content-Type': "application/json"
            },
            data: data
        })
        .then(response => {
            var data = response;
            callback(data);
            dispatch({
                type: "PROJECT_CREATED",
                project_created: data
            });
        }).catch(error => {
            callback(error);
            dispatch({ type: "PROJECT_CREATED", project_created: error });
        });
    }
}